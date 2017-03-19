"use strict";
function GLab(containerId)
{
	this.svgElm				= make_container(containerId);
	this.nodesBundler		= new NodesBundler();
	this.hiddenSegments		= [];

	document.addEventListener('tryToConnect', (e) => {
		tryToConnectHandler.call(this, e).then((toElm) => {
			//todo check in connection exist
			//chain reaction
			let tmp = newSegments(e.detail.data ,toElm.data);
			this.svgElm.appendChild(tmp);
			e.detail.data.connections.push({to: toElm.data, seg: tmp});
			toElm.data.connections.push({to: e.detail.data, seg: tmp});
		},(error) => {});
	}, false);
	document.addEventListener('nodeStartMoving', (e) => {
		this.nodesBundler.mapConnections(e.detail.nodeId, (con) => {
			con.seg.hide();
		});
	}, false);
	document.addEventListener('nodeMoved', (e) => {
		let node = this.nodesBundler.getNodeById(e.detail.nodeId);
		this.nodesBundler.updateNodePositions(node, e.detail.pos);
		this.nodesBundler.mapConnections(e.detail.nodeId, (con) => {
			con.seg.show();
		});
	}, false);
	
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
