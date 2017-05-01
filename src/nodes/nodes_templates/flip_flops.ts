/**
 * Created by abdou on 01/05/17.
 */
function loadFlipFlops(nodes: any)
{
	nodes.flip_flop_t = {
		content: `
			<g class="draggable">
				<rect width="50" height="50" rx="10" ry="10"
				    style="fill:#eee;stroke:#216622;stroke-width:5"></rect>
				<line
                x1="0"
                y1="15"
                x2="-10"
                y2="15"
                style="stroke:#216622;stroke-width:4"
                ></line>
                <text x="1" y="24" font-size="25">></text>
                <line
                x1="0"
                y1="35"
                x2="-10"
                y2="35"
                style="stroke:#216622;stroke-width:4"
                ></line>
                <line
				x1="50"
				y1="15"
				x2="60"
				y2="15"
				style="stroke:#216622;stroke-width:4"></line>
				<line
				x1="50"
				y1="35"
				x2="60"
				y2="35"
				style="stroke:#216622;stroke-width:4"></line>
                <text x="18" y="30" font-size="20" >T</text>
                </circle>
			</g>
			<circle connectable="input" class="connectable input-a" cx="-15"
				cy="15" r="5"/>
			<circle connectable="input" class="connectable input-b" cx="-15"
				cy="35" r="5"/>
			<circle connectable="output" class="connectable output-a" cx="65"
				cy="15" r="5"/>
			<circle connectable="output" class="connectable output-b" cx="65"
				cy="35" r="5"/>
			`,
		beforeStart: function ()
		{
			let inputs =
				[
					{
						position: {x: -15, y: 15},
						name: 'a',
						elm: this.getElementsByClassName('input-a')[0]
					},
					{
						position: {x: -15, y: 35},
						name: 'b',
						elm: this.getElementsByClassName('input-b')[0]
					}
				];
			let	outputs =
				[
					{
						position: {x: 65, y: 15},
						name: 'a',
						elm: this.getElementsByClassName('output-a')[0]
					},
					{
						position: {x: 65, y: 35},
						name: 'b',
						elm: this.getElementsByClassName('output-b')[0]
					}
				];
			return ({inputs: inputs, outputs: outputs});
		},
		afterStart: function ()
		{
			this.setOutputValue('a',true);
			this.setOutputValue('b',false);

			this.onInputValueChange('a', ()=> {
				updateOutputs.call(this);
			});

			function updateOutputs(){
				if(this.inputHasTrue('a')){
					var q = this.getOutputValue('a');
					this.setOutputValue('a',!q);
					this.setOutputValue('b',q);
				}
			}
			updateOutputs.call(this);
		}
	};}