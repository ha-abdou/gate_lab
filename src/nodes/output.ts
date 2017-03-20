"use strict";
"use strict";
interface outputConnection
{
    to:         Input;
    segment:    Segment;
}

class Output
{
    connections: inputConnection[];
    value:       any;
    constructor(public elm: SVGElement, public position: Position)
    {
        elm.onmousedown = this.onMouseDown;
        elm.property = this;
    }

    private onMouseDown(event: event)
    {
        let c_event: CustomEvent;

        this.elm.onmouseup = () => {
            this.elm.onmouseup = null;
            this.elm.onmousemove = null;
        };
        this.elm.onmousemove = () => {
            this.elm.onmouseup = null;
            this.elm.onmousemove = null;
            c_event = new CustomEvent('tryToConnect', {detail: {'output': this}});
            document.dispatchEvent(c_event);
        };
    }
}
