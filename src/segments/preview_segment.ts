"use strict";
class PreviewSegment
{
    elm: 	SVGElement;
    to:     Position;
    constructor(public from: Position)
    {
        this.elm = <SVGElement>document.createElementNS(SVGNS, 'line');
        this.elm.setAttributeNS(null, 'style', "stroke:rgb(0,255,0);stroke-width:2");
        this.elm.setAttributeNS(null, 'id', 'preview-segment');
        this.upDate(from);
        this.elm.property = this;
    }

    remove ()
    {
        this.elm.remove();
    }

    upDate(to: Position)
    {
        this.to = to;
        this.elm.setAttributeNS(null, 'x1', this.from.x.toString());
        this.elm.setAttributeNS(null, 'y1', this.from.y.toString());
        this.elm.setAttributeNS(null, 'x2', (to.x - 3).toString());
        this.elm.setAttributeNS(null, 'y2', to.y.toString());
    }
}