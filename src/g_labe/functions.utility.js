function make_container(containerId) {
	let svgElm = null;

	svgElm = document.createElementNS(SVGNS, 'svg');
	svgElm.id = 'svg-container';
	document.getElementById(containerId).appendChild(svgElm);;
	return (svgElm);
}
