"use strict";

class Output
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

    setValue (value: any)
    {
        if (this.value != value)
        {
            this.value = value;
            //todo chain reaction
            if (this.connections.length > 0)
            {
                for (let i = this.connections.length - 1; i >= 0; i--)
                    this.connections[i].to.setValue(value);
            }
        }
    }

    getValue ()
    {
        return (this.value);
    }

    globalPosition (): Position
    {
        return (<Position>{
            x: this.position.x + this.parentNode.position.x,
            y: this.position.y + this.parentNode.position.y
        });
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
            c_event = new CustomEvent('tryToConnect', {detail: {con: this, type: 'output'}});
            document.dispatchEvent(c_event);
        };
    }
}
