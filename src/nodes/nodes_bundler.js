"use strict";
function NodesBundler()
{
	this.nodesList 		= [];
	this.templateList	= {};

	this.templateList = loadTemplate();
}

NodesBundler.prototype.load = function(nodeName)
{
	let	node = null;

	node = makeNode(this.templateList[nodeName]);
	this.nodesList.push(node);
	node.upDateOutput();
	return (node.elm);
};
