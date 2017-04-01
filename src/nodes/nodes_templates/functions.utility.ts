"use strict";

//todo
function loadTemplate() {
	return {
		and: 
		{
			content: `
			<g class="draggable">
				<image xlink:href="img/svg/Logical_and.png" x="0" y="0" height="50" width="95"/>
			</g>
			<circle connectable="input" class="connectable input-a" cx="5"
				cy="13" r="5"/>
			<circle connectable="input" class="connectable input-b"
				cx="5" cy="37" r="5"/>
			<circle connectable="output" class="connectable output-c" cx="95"
				cy="25" r="5"/>
			`,
			inputs: 
			[
				{
					position: {x: 5, y: 13},
					name: 'a',
					elm: {}
				},
				{
					position: {x: 5, y: 37},
					name: 'b',
					elm: {}
				}
			],
			outputs:
			[
				{
					position: {x: 95, y: 25},
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
			afterStart()
			{

			},
			//todo dependency: []
			upDateOutputs: function ()
            {
				this.setOutputValue('c', !this.getInputLastValue('a') || !this.getInputLastValue('a'));
			}
		},
		display: 
		{
			content: `
			<g class="draggable">
				<rect width="40" height="40" rx="10" ry="10"
				    style="fill:#ce0200;stroke:#c0bdbd;stroke-width:5"></rect>
			</g>
			<circle connectable="input" class="connectable input-a" cx="-2"
				cy="20" r="5"/>
			`,
			inputs: 
			[
				{
					position: {x: -2, y: 20},
					name: 'a',
				}
			],
			outputs:
			[],
			beforeStart: function (node)
			{
				this.inputs[0].elm = node.getElementsByClassName('input-a')[0];
				return ({inputs: this.inputs, outputs: this.outputs});
			},
			//todo dependency: []
			upDateOutputs: function ()
            {
				if (this.getInputLastValue('a') === true)
                    this.elm.querySelector(".draggable rect").style.fill = "#ce0200";
                else
                    this.elm.querySelector(".draggable rect").style.fill = "#2bce00";
            }
		},
		source:
		{
			content: `
			<g class="draggable">
				<rect width="40" height="40" rx="10" ry="10"
				    style="fill:#ce0200;stroke:#c0bdbd;stroke-width:5"></rect>
			</g>
			<circle connectable="output" class="connectable output-a" cx="42"
				cy="20" r="5"/>
			`,
			outputs:
				[
					{
						position: {x: 42, y: 20},
						name: 'a',
					}
				],
			inputs:
				[],
			beforeStart: function (node)
			{
				this.outputs[0].elm = node.getElementsByClassName('output-a')[0];
				return ({inputs: this.inputs, outputs: this.outputs});
			},
			//todo dependency: []
			upDateOutputs: function ()
			{
				this.setOutputValue('a', true);
				if (this.getOutputValue('a') === true)
					this.elm.querySelector(".draggable rect").style.fill = "#ce0200";
				else
					this.elm.querySelector(".draggable rect").style.fill = "#2bce00";
			}
		},
		clock:
		{
			content: `
			<g class="draggable">
				<rect width="40" height="40" rx="10" ry="10"
				    style="fill:#0dce00;stroke:#c0bdbd;stroke-width:5"></rect>
			</g>
			<circle connectable="output" class="connectable output-a" cx="42"
				cy="20" r="5"/>
			`,
			outputs:
				[
					{
						position: {x: 42, y: 20},
						name: 'a',
					}
				],
			inputs:
				[],
			beforeStart: function (node)
			{
				this.outputs[0].elm = node.getElementsByClassName('output-a')[0];
				return ({inputs: this.inputs, outputs: this.outputs});
			},
			//todo dependency: []
			upDateOutputs: function ($interval, $timeout)
			{
				this.setOutputValue('a', true);
				$interval(() => {
					this.setOutputValue('a', !this.getOutputValue('a'));
                    console.log('eee');
				}, 1000);
			}
		}
	};
}