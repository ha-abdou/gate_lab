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
			//let tmp = newSegments(e.detail.data ,toElm.data);
			let tmp = new Segment(e.detail.data ,toElm.data);
			this.svgElm.appendChild(tmp.elm);
			e.detail.data.connections.push({to: toElm.data, seg: tmp});
			toElm.data.connections.push({to: e.detail.data, seg: tmp});
			this.chainReaction(toElm.data, e.detail.data, e.detail.typeName);
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
//todo many connections a
GLab.prototype.chainReaction = function (to, from , fromType)
{
	if (fromType === "input")
		return (this.chainReaction(from, to, 'output'));
	if (from.value != to.value)
	{
		let node = to.elm.parentElement.data;

		to.value = from.value;
		node.upDateOutput();
		for (let i = node.outputs.length - 1; i >= 0; i--) {
			for (let j = node.outputs[i].connections.length - 1; j >= 0; j--) {
				node.outputs[i].connections[j]
			}
		}
	}
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
