"use strict";
function NodesBundler()
{
	this.nodesList 		= [];
	this.templateList	= {};

	this.templateList = loadTemplate();
}

NodesBundler.prototype.load = function(nodeName)
{
	let	node = {};

	node = makeNode(this.templateList[nodeName]);
	this.nodesList.push(node);
	node.upDateOutput();
	this.updateNodePositions(node, {x: 10, y: 10});
	node.elm.data = node;
	return (node.elm);
};

NodesBundler.prototype.updateNodePositions = function(node, positions)
{
	let dif = {x: 0, y: 0};

	dif.x = node.positions.x - positions.x;
	dif.y = node.positions.y - positions.y;
	node.positions.x = positions.x;
	node.positions.y = positions.y;
	node.elm.setAttributeNS(null, "transform" ,
					'translate(' + (positions.x) + ',' + (positions.y) + ')');
	updateIO(node.outputs, dif);
	updateIO(node.inputs, dif);
	function updateIO(IO, dif) {
		let len = IO.length;
		for (let i = 0; i < len; i++)
		{
			IO[i].positions.x -= dif.x;
			IO[i].positions.y -= dif.y;
			if (IO[i].connections.length > 0)
				updateConnections(IO[i].connections);
		}
	}
	function updateConnections(connections){
		for (let i = connections.length - 1; i >= 0; i--) {
			connections[i].seg.upDate();
		}
	}
};

NodesBundler.prototype.getNodeById = function(nodeId)
{
	let len = this.nodesList.length;
	for (let i = 0; i < len; i++)
	{
		if (this.nodesList[i].id === nodeId)
			return (this.nodesList[i]);
	}
	return (0);
};

NodesBundler.prototype.mapConnections = function(nodeId, f) {
	let node = this.getNodeById(nodeId);

	mapIO(node.outputs, f);
	mapIO(node.inputs, f);
	/*
	for (let i = node.inputs.connections.length - 1; i >= 0; i--)
		f(node.inputs.connections[i++]);*/
};

function mapIO(IO, f) {
	for (var j = IO.length - 1; j >= 0; j--) {
		for (let i = IO[j].connections.length - 1; i >= 0; i--)
			f(IO[j].connections[i]);
	}
}