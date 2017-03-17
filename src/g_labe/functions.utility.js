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
	let att		= '';

	promise = new Promise((resolve, reject) => {
		document.onmousemove = e1 => {
			//previewLine
		};
		document.onmouseup = e => {
			document.onmouseup = null;
			document.onmousemove = null;
			console.log(e);
		    att = e.path[0].attributes.connectable ? e.path[0].attributes.connectable.value : '';
			if ((att === 'input' || att === 'output') && e.path[0].nodeName === 'circle' 
				&& att != event.detail.typeName)
				resolve("Success!"); 
			else
				reject("errorrrr");
		}
	});

	promise.then((successMessage) => {
	    console.log("Yay! " + successMessage);
	},(error) => {});
}
