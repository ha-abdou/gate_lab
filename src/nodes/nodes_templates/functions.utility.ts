"use strict";
//todo
function uid(){
    return Math.floor((1 + Math.random()) * 0x100000).toString(16).substring(1)
}

//todo
function loadTemplate() {
	return {
		and: 
		{
			content: `
			<g class="draggable">
				<rect width="50" height="50" style="fill:rgb(0,0,255)" />
			</g>
			<circle connectable="input" class="connectable input-a" cx="0" cy="15" r="5"/>
			<circle connectable="input" class="connectable input-b" input-name="b" cx="0" cy="35" r="5"/>
			<circle connectable="output" class="connectable output-c" cx="50" cy="25" r="5"/>
			`,
			inputs: 
			[
				{
					position: {x: 0, y: 15},
					name: 'a',
					elm: {}
				},
				{
					position: {x: 0, y: 35},
					name: 'b',
					elm: {}
				}
			],
			outputs:
			[
				{
					position: {x: 50, y: 25},
					name: 'c',
					elm: {}
				}
			],
			beforeStart: function (node)
			{
				this.inputs[0].elm = node.getElementsByClassName('input-a')[0];
				this.inputs[1].elm = node.getElementsByClassName('input-b')[0];
				this.outputs[0].elm = node.getElementsByClassName('output-c')[0];
				return ({inputs: this.inputs, outputs: this.outputs});
			},
			//todo dependency: []
			upDateOutput: function () {
				//console.log(this);
				//this.outputs[0].value = !(this.inputs[0].value &&
				// this.inputs[1].value);
			}
		},
		display: 
		{
			content: `
			<g class="draggable">
				<rect width="50" height="50" style="fill:rgb(0,0,255)" />
			</g>
			<circle connectable="input" class="connectable input-a" cx="0" cy="15" r="5"/>
			`,
			inputs: 
			[
				{
					positions: {x: 0, y: 15},
					name: 'a',
				}
			],
			outputs:
			[],
			//todo dependency: []
			upDateOutput: function () {
				//console.log(this);
				console.log(this.inputs[0].value);
			}
		}
	};
}