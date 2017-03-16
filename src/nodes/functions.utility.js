"use strict";
//todo
function uid(){
    return Math.floor((1 + Math.random()) * 0x100000).toString(16).substring(1)
}

//todo
function loadTemplate() {
	return {
		test: 
		{
			content: `
			<circle cx="20" cy="20" r="20"/>
			`,
			inputs: 0,
			output: 0
		}
	};
}