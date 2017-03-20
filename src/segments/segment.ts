"use strict";
class Segment
{
	elm: SVGElement;
	constructor(public from: Output, public to: Input)
	{
		this.elm = <SVGElement>document.createElementNS(SVGNS, 'line');
		this.elm.setAttributeNS(null, 'style', "stroke:rgb(255,0,0);stroke-width:2");
		this.elm.setAttributeNS(null, 'id', uid());
		this.upDate();
		this.elm.property = this;
	}
	
	hide()
	{
		this.elm.style.visibility = "hidden";
	}

	show()
	{
		this.elm.style.visibility = "visible";
	}

	upDate()
	{
		this.elm.setAttributeNS(null, 'x1', this.from.positions.x.toString());
		this.elm.setAttributeNS(null, 'y1', this.from.positions.y.toString());
		this.elm.setAttributeNS(null, 'x2', this.to.positions.x.toString());
		this.elm.setAttributeNS(null, 'y2', this.to.positions.y.toString());
	}

	remove()
	{
	}
	private segmentOnMouseDown()
	{
	}
}