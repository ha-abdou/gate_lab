"use strict";
//todo add attr to IO
class Node
{
    elm:           SVGElement;
    inputs:        Input[];
    outputs:       Output[];
    tempaleteAPI:  TempaleteAPI;

    private _upDateOutputs: any;

    constructor(template: any, public position: Position,
                public id: string)
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
        IO = template.beforeStart(this.elm);
        this.elm.property = this;
        this.addInputs(IO.inputs);
        this.addOutputs(IO.outputs);
        this._upDateOutputs = template.upDateOutputs;
        this.tempaleteAPI = new TempaleteAPI(this);
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
        /*
        let i: number, j: number;
        for (i = this.inputs.length - 1; i >= 0; i--)
        {
            for (j = this.inputs[i].connections.length - 1; j >= 0; j--)
                f.call(null, this.inputs[i].connections[j]);
        }
        for (i = this.outputs.length - 1; i >= 0; i--)
        {
            for (j = this.outputs[i].connections.length - 1; j >= 0; j--)
                f.call(null, this.outputs[i].connections[j]);
        }
        */
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

    upDateOutputs ()
    {
        this._upDateOutputs.call(this.tempaleteAPI);
    }

    remove ()
    {
        this.elm.remove();
        this.disableConnections();
    }
    //todo if has $timeOut $interval
    enableConnections ()
    {
        this.mapInputs((input: Input) => {
            input.enableConnections();
        });
        this.mapOutputs((output: Output) => {
            output.enableConnections();
        });
        //todo remove ween necessary
        this.upDateOutputs();
    }
    //todo if has $timeOut $interval
    disableConnections ()
    {
        this.mapInputs((input: Input) => {
            input.disableConnections();
        });
        this.mapOutputs((output: Output) => {
            output.disableConnections();
        });
    }
    //todo vars
    private onMouseDown(event: Event)
    {
        if (LABSTATUS === NORMAL)
            this.dragAndDropHandler(event);
        else if (LABSTATUS === 2)
            document.dispatchEvent(new CustomEvent('deleteNode', {detail: {node: this}}));
    }

    private dragAndDropHandler(event: Event) {
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
            //todo update inputs/outputs position
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

    private addOutputs(outputs: Output[]):void {
        for (let i = outputs.length - 1; i >= 0 ; i--)
            this.outputs.push(new Output(outputs[i].elm, outputs[i].position,
                outputs[i].name, this));
    }

    private addInputs(inputs: Input[]):void {
        for (let i = inputs.length - 1; i >= 0 ; i--)
            this.inputs.push(new Input(inputs[i].elm, inputs[i].position,
                inputs[i].name, this));
    }
}
