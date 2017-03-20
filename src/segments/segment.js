"use strict";
var Segment = (function () {
    function Segment(from, to) {
        this.from = from;
        this.to = to;
        this.elm = document.createElementNS(SVGNS, 'line');
        this.elm.setAttributeNS(null, 'style', "stroke:rgb(255,0,0);stroke-width:2");
        this.elm.setAttributeNS(null, 'id', uid());
        this.upDate();
        this.elm.property = this;
    }
    Segment.prototype.hide = function () {
        this.elm.style.visibility = "hidden";
    };
    Segment.prototype.show = function () {
        this.elm.style.visibility = "visible";
    };
    Segment.prototype.upDate = function () {
        this.elm.setAttributeNS(null, 'x1', this.from.positions.x.toString());
        this.elm.setAttributeNS(null, 'y1', this.from.positions.y.toString());
        this.elm.setAttributeNS(null, 'x2', this.to.positions.x.toString());
        this.elm.setAttributeNS(null, 'y2', this.to.positions.y.toString());
    };
    Segment.prototype.remove = function () {
    };
    Segment.prototype.segmentOnMouseDown = function () {
    };
    return Segment;
})();
