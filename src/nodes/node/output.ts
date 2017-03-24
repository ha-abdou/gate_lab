"use strict";
interface outputConnections
{
    to:         Input;
    segment:    Segment;
}

class Output
{
    connections: outputConnections[];
    value:       any;

    constructor(public elm: SVGElement, public position: Position, public name: string
        , public parentNode: Node)
    {
        elm.onmousedown = this.onMouseDown.bind(this);
        elm.property = this;
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
