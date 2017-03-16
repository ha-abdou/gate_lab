"use strict";
function makeNode(template) {
	let	node = {};

	node.id = uid();
	node.positions = {x: 0, y: 0};
	node.inputs = template.inputs ? makeInputs(template) : [];
	node.outputs = template.outputs ? makeOutputs(template) : [];
	node.upDateOutput = template.upDateOutput ? template.upDateOutput : function(){console.log(this)};
	node.elm = document.createElementNS(SVGNS, 'g');
	node.elm.innerHTML = template.content;
	node.elm.setAttributeNS(null, "transform" , "translate(0,0)");
	node.elm.setAttributeNS(null, "class" , 'node');
	node.elm.setAttributeNS(null, "node-id" , node.id);
	dopeNode(node.elm);
	return (node);
}

function dopeNode(node) {
	node.onmousedown = function (event) {
		if (LABSTATUS === 1)
		{
			console.log('add event node start moving');
			document.onmousemove = function (e) {
				node.setAttributeNS(null, "transform" ,
					'translate(' + (e.offsetX) + ',' + (e.offsetY) + ')');
			}
			document.onmouseup = function (e) {
				console.log('add event node stop moving');
				document.onmousemove = null;
				document.onmouseup = null;
			}
		}
		else if (LABSTATUS === 2)
		{
			//delete
			console.log('todo delete node');
			node.onmousedown = null;
		}
	};
}
