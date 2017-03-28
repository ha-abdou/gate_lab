"use strict";
class Segment
{
	elm: 	SVGElement;
	constructor(public from: Output, public to: Input)
	{
		this.elm = <SVGElement>document.createElementNS(SVGNS, 'line');
		this.elm.setAttributeNS(null, 'style', "stroke:rgb(255,0,0);stroke-width:4");
		this.elm.setAttributeNS(null, 'id', uid());
		this.upDate();
		this.elm.property = this;
		this.elm.onmousedown = this.onMouseDown;
	}
	
	hide()
	{
		this.elm.style.visibility = "hidden";
	}

	show()
	{
		this.elm.style.visibility = "visible";
	}

	remove ()
    {
        this.elm.remove();
    }

	upDate()
	{
		this.elm.setAttributeNS(null, 'x1', this.from.globalPosition().x.toString());
		this.elm.setAttributeNS(null, 'y1', this.from.globalPosition().y.toString());
		this.elm.setAttributeNS(null, 'x2', this.to.globalPosition().x.toString());
		this.elm.setAttributeNS(null, 'y2', this.to.globalPosition().y.toString());
	}

	private onMouseDown()
	{
        if (LABSTATUS === DELETE)
        {
            let c_event: CustomEvent;

            c_event = new CustomEvent('deleteConnection', {detail: {segment: this.property}});
            document.dispatchEvent(c_event);
        }
	}
}