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
