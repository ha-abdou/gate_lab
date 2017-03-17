"use strict";
function GLab(containerId)
{
	this.svgElm				= make_container(containerId);
	this.nodesBundler		= new NodesBundler();
//	this.segmentsBundler	= new SegmentsBundler();
	document.addEventListener('tryToConnect', tryToConnectHandler.bind(this), false);
	
}

GLab.prototype.loadNode = function(nodeName)
{
	let		node = null;

	node = this.nodesBundler.load(nodeName);
	this.svgElm.appendChild(node);
};

GLab.prototype.deleteNode = function(node)
{
};

GLab.prototype.nodeMoved = function(from, node)
{
};

GLab.prototype.createSegment = function(output, input, segment = null)
{
};

GLab.prototype.deleteSegment = function(output, input, segment = null)
{
};
