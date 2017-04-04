"use strict";
//todo add attr to IO
class Node
{
    elm:                SVGElement;
    nodeDependencies:   any[];
    private inputs:             Input[];
    private outputs:            Output[];
    private tempaleteAPI:       TempaleteAPI;
    //todo bootstrap node
    constructor(template: any, public position: Position,
                public id: string, public name: string, public $scope: {} = {})
    {
        let dragCon: SVGElement;
        let IO:      any;
        // todo init vars
        this.inputs = [];
        this.outputs = [];
        this.elm = <SVGElement>document.createElementNS(SVGNS, 'g');
        this.elm.innerHTML = template.content;
        this.elm.setAttributeNS(null, "class", 'node');
        this.elm.setAttributeNS(null, "id", id);
        this.move(position);
        //add IO
        dragCon = <SVGElement>this.elm.getElementsByClassName('draggable')[0];
        //todo bind(this)
        dragCon.onmousedown = this.onMouseDown.bind(this);
        this.makeDependencies();
        this.tempaleteAPI = new TempaleteAPI(this);

        IO = template.beforeStart.run(this.elm, this.nodeDependencies[1]);
        this.elm.property = this;
        this.addInputs(IO.inputs);
        this.addOutputs(IO.outputs);
        //todo after start
        template.afterStart.run(this.tempaleteAPI, this.nodeDependencies[1]);

    }

    move (to: Position)
    {
        this.position = to;
        this.elm.setAttributeNS(null, "transform" ,
            "translate(" + (to.x) + ", "+ (to.y) + ")");
    }

    mapConnections (f: any)
    {
        this.mapInputs((input: Input, index: number) =>
        {
            input.mapConnections(f);
        });

        this.mapOutputs((output: Output, index: number) =>
        {
            output.mapConnections(f);
        });
    }
    //todo add index of IO
    mapInputs (f: any)
    {
        let i: number;

        for (i = this.inputs.length - 1; i >= 0; i--)
        {
            f.call(null, this.inputs[i], i);
        }
    }
    //todo add index of IO
    mapOutputs (f:  any)
    {
        let i: number;

        for (i = this.outputs.length - 1; i >= 0; i--)
        {
            f.call(null, this.outputs[i], i);
        }
    }
    //
    remove ()
    {
        this.elm.remove();
    }

    enable ()
    {
        this.enableConnections();
        this.enableIntervalsTimeouts();
    }

    disable ()
    {
        this.disableIntervalsTimeouts();
        this.disableConnections();
    }

    enableConnections ()
    {
        this.mapInputs((input: Input) => {
            input.enableConnections();
        });
        this.mapOutputs((output: Output) => {
            output.enableConnections();
        });
    }

    disableConnections ()
    {
        this.mapInputs((input: Input) => {
            input.disableConnections();
        });
        this.mapOutputs((output: Output) => {
            output.disableConnections();
        });
    }
    //todo redo
    enableIntervalsTimeouts ()
    {
        for (let interval in this.nodeDependencies[0].intervals)
            this.nodeDependencies[0].intervals[interval].unPause();
        for (let timeout in this.nodeDependencies[0].timeouts)
            this.nodeDependencies[0].timeouts[timeout].unPause();
    }
    //todo redo
    disableIntervalsTimeouts ()
    {
        for (let interval in this.nodeDependencies[0].intervals)
            this.nodeDependencies[0].intervals[interval].pause();
        for (let timeout in this.nodeDependencies[0].timeouts)
            this.nodeDependencies[0].timeouts[timeout].pause();
    }
    //todo vars
    private onMouseDown(event: Event)
    {
        if (LABSTATUS === NORMAL)
            this.dragAndDropHandler(event);
        else if (LABSTATUS === 2)
            document.dispatchEvent(new CustomEvent('deleteNode',
                {detail: {node: this}}));
    }

    private dragAndDropHandler(event: Event)
    {
        let c_event: CustomEvent;
        let offset: Position;

        offset = <Position>{x: event.clientX - this.position.x,
                            y: event.clientY - this.position.y};
        c_event = new CustomEvent('nodeStartMoving', {detail: {node: this}});
        document.dispatchEvent(c_event);
        document.onmousemove = (e) => {
            this.move(<Position>{x: e.clientX - offset.x, y: e.clientY - offset.y});
        };
        this.elm.onmouseup = () => {
            c_event = new CustomEvent('nodeMoved', {detail: {node: this,
                lastPosition: <Position>{
                    x: (offset.x - event.clientX) * -1,
                    y: (offset.y - event.clientY) * -1
                }}});
            document.dispatchEvent(c_event);
            document.onmousemove = null;
            this.elm.onmouseup = null;
        };
    }

    private addOutputs(outputs: Output[]):void
    {
        for (let i = outputs.length - 1; i >= 0 ; i--)
            this.outputs.push(new Output(outputs[i].elm, outputs[i].position,
                outputs[i].name, this));
    }

    private addInputs(inputs: Input[]):void
    {
        for (let i = inputs.length - 1; i >= 0 ; i--)
        {
            this.inputs.push(new Input(inputs[i].elm, inputs[i].position,
                inputs[i].name, this));
        }
    }
    //todo review
    private makeDependencies ()
    {
        this.nodeDependencies =
        [
            {
                intervals: [],
                timeouts: []
            },
            {
                '$scope': this.$scope,
                '$timeout': (func: any, time: number) => {
                    $timeout(func, time, this.nodeDependencies[0].timeouts)
                },
                '$clearTimeout': (tId: number) =>
                {
                    $clearTimeout(tId, this.nodeDependencies[0].timeouts)
                },
                '$interval': (func: any, time: number) => {
                    $interval (func, time, this.nodeDependencies[0].intervals)
                },
                '$clearInterval': (iId: number) =>
                {
                    $clearInterval(iId, this.nodeDependencies[0].intervals)
                }
            }
        ];
    }

    private makeNode()
    {

    }
}
