"use strict";
const	SVGNS		= "http://www.w3.org/2000/svg";
let		LABSTATUS	= 1;//0 non, 1 moving, 2 deleting

function main() {
	let	lab = null;

	lab = new GLab("lab-svg");
	lab.loadNode("and");
	lab.loadNode("and");
	lab.loadNode("display");
}
