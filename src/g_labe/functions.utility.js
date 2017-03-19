"use strict";
function make_container(containerId) {
	let svgElm = null;

	svgElm = document.createElementNS(SVGNS, 'svg');
	svgElm.id = 'svg-container';
	document.getElementById(containerId).appendChild(svgElm);;
	return (svgElm);
}
//todo firefox nt suporte e.path
function tryToConnectHandler(event) {
	let promise = {};
	let line	= {};//todo static
	let att		= '';

	line = document.createElementNS(SVGNS, 'line');
	line.setAttributeNS(null, 'x1', event.detail.data.positions.x.toString());
	line.setAttributeNS(null, 'y1', event.detail.data.positions.y.toString());
	this.svgElm.appendChild(line);
	promise = new Promise((resolve, reject) => {
	line.setAttributeNS(null, 'style', "stroke:rgb(255,0,0);stroke-width:2");
		document.onmousemove = e => {
			line.setAttributeNS(null, 'x2', (e.offsetX).toString());
			line.setAttributeNS(null, 'y2', (e.offsetY + 2).toString());		
		};
		document.onmouseup = e => {
			document.onmouseup = null;
			document.onmousemove = null;
		    att = e.path[0].attributes.connectable ? e.path[0].attributes.connectable.value : '';
			if ((att === 'input' || att === 'output') && e.path[0].nodeName === 'circle' 
				&& att != event.detail.typeName)
				resolve(e.path[0]); 
			else
				reject("errorrrr");
			line.remove();
			line = null;
		}
	});
	return (promise);
}
