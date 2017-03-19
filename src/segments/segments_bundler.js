"use strict";

function newSegments(from, to) {
	var segment = {};

	segment = document.createElementNS(SVGNS, 'line');
	segment.setAttributeNS(null, 'style', "stroke:rgb(255,0,0);stroke-width:2");
	segment.setAttributeNS(null, 'id', uid());
	
	segment.hide = hideSegment;
	
	segment.show = showSegment;

	segment.upDate = segmentUpDate;

	segment.onmousedown = segmentOnMouseDown;

	segment.delete = deleteSegment;

	segment.from = from;

	segment.to = to;

	segment.upDate();

	return (segment);
}

function hideSegment()
{
	this.style.visibility = "hidden";
}

function showSegment()
{
	this.style.visibility = "visible";
}

function segmentUpDate()
{
	this.setAttributeNS(null, 'x1', this.from.positions.x.toString());
	this.setAttributeNS(null, 'y1', this.from.positions.y.toString());
	this.setAttributeNS(null, 'x2', this.to.positions.x.toString());
	this.setAttributeNS(null, 'y2', this.to.positions.y.toString());
}

function segmentOnMouseDown(e)
{
}

function deleteSegment(segment)
{
}