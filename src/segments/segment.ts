"use strict";
class Segment
{
	elm: 	SVGElement;
	l1:  	SVGElement;
	l2: 	SVGElement;
	constructor(public from: Output, public to: Input)
	{
		this._create();
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
		this._updateLine(this.l1);
		this._updateLine(this.l2);
	}

	private _updateLine (line: SVGElement)
	{
		//todo save globalPosition to var
		line.setAttributeNS(null, 'x1', this.from.globalPosition().x.toString());
		line.setAttributeNS(null, 'y1', this.from.globalPosition().y.toString());
		line.setAttributeNS(null, 'x2', this.to.globalPosition().x.toString());
		line.setAttributeNS(null, 'y2', this.to.globalPosition().y.toString());
	}

	private _create ()
	{
		this.elm = <SVGElement>document.createElementNS(SVGNS, 'g');
		this.l1 = <SVGElement>document.createElementNS(SVGNS, 'line');
		this.l2 = <SVGElement>document.createElementNS(SVGNS, 'line');
		this.l1.setAttributeNS(null, 'style', "stroke:rgb(0,0,0);stroke-width:5");
		this.l2.setAttributeNS(null, 'style', "stroke:rgb(255,255,255);stroke-width:3");
		this.elm.appendChild(this.l1);
		this.elm.appendChild(this.l2);
		this.elm.setAttributeNS(null, 'id', uid());
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