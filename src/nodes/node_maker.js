"use strict";
function makeNode(template) {
	let	node = {};

	node.id = uid();
	node.positions = {x: 10, y: 10};
	node.elm = document.createElementNS(SVGNS, 'g');
	node.elm.innerHTML = template.content;
	node.elm.setAttributeNS(null, "transform" , "translate(10,10)");
	node.elm.setAttributeNS(null, "class" , 'node');
	node.elm.setAttributeNS(null, "node-id" , node.id);
	dopeNode(node.elm.getElementsByClassName('draggable')[0]);

	node.inputs = template.inputs ? makeIO(template.inputs, node.elm, 'input') : [];
	node.outputs = template.outputs ? makeIO(template.outputs, node.elm, 'output') : [];
	node.upDateOutput = template.upDateOutput ? template.upDateOutput : function(){console.log(this)};
	return (node);
}

function dopeNode(node) {
	node.onmousedown = function (event) {
		if (LABSTATUS === 1)
		{
			console.log('add event node start moving');
			document.onmousemove = function (e) {
				node.parentElement.setAttributeNS(null, "transform" ,
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

function makeIO(tab, nodeElm, typeName) {
	let	tmp_tab	= [];
	let tmp		= {};
	let	l		= 0;
	let i		= 0;

	l = tab.length;
	while (i < l)
	{
		tmp.positions = {x: tab[i].positions.x, y: tab[i].positions.y};
		tmp.value = false;
		tmp.name = tab[i].name;
		tmp.elm = nodeElm.getElementsByClassName(typeName + '-' + tmp.name)[0];
		dopeIO(tmp, typeName);
		tmp_tab.push(tmp);
		tmp = {};
		i++;
	}
	return (tmp_tab);
}

function dopeIO(IO, typeName) {
	let tryToConnectEvent = {};

	IO.elm.onmousedown = function (event) {
		tryToConnectEvent = new CustomEvent('tryToConnect', {detail: {'data': IO, 'typeName': typeName}});
		document.dispatchEvent(tryToConnectEvent);
		IO.elm.onmousemove = null;
	}
}
