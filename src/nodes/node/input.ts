"use strict";

class Input
{
    connections:   Segment[];
    private value: any;

    constructor(public elm: SVGElement, public position: Position, public name: string,
                public parentNode: Node)
    {
        elm.onmousedown = this.onMouseDown.bind(this);
        elm.property = this;
        this.connections = [];
        this.value = null;
    }

    enableConnections ()
    {
        this.mapConnections((con: any) => {
            con.from.addConnection(con);
            con.show();
        })
    }

    disableConnections ()
    {
        this.mapConnections((con: any) => {
            con.from.removeConnection(con);
            con.hide();
        })
    }

    globalPosition (): Position
    {
        return (<Position>{
            x: this.position.x + this.parentNode.position.x,
            y: this.position.y + this.parentNode.position.y
        });
    }

    setValue (value: any)
    {
        if (this.value != value)
        {
            this.value = value;
            //todo push to stack executer
            this.parentNode.upDateOutputs();
        }
    }

    addConnection (seg: Segment)
    {
        this.connections.push(seg);
        this.setValue(seg.from.getValue());
    }

    removeConnection(seg: Segment)
    {
        this.mapConnections((con: Segment, index: number) => {
            if (seg == con)
            {
                this.connections.splice(index, 1);
                if (this.connections.length === 0)
                    this.setValue(null);
                else
                    this.setValue(this.connections[0].from.getValue());
                this.parentNode.upDateOutputs();
            }
        });
    }

    getValues()
    {
        let values: any[] = [];

        for (let i = this.connections.length - 1; i >= 0 ; i--)
            values.push(this.connections[i].from.getValue());
        return (values);
    }

    getLastValue ()
    {
        return (this.value);
    }

    mapConnections (f: any)
    {
        let i: number;

        for (i = this.connections.length - 1; i >= 0; i--)
            f.call(null, this.connections[i], i);
    }

    private onMouseDown(event: Event)
    {
        let c_event: CustomEvent;

        this.elm.onmouseup = () => {
            this.elm.onmouseup = null;
            this.elm.onmousemove = null;
        };
        this.elm.onmousemove = () => {
            this.elm.onmouseup = null;
            this.elm.onmousemove = null;
            c_event = new CustomEvent('tryToConnect', {detail: {con: this, type: 'input'}});
            document.dispatchEvent(c_event);
        };
    }
}
