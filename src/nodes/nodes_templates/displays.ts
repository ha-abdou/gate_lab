/**
 * Created by abdou on 16/04/17.
 */
function loadDisplays (nodes: any)
{
    nodes.lamp = {
        content: `
			<g class="draggable">
				<rect width="50" height="50" rx="10" ry="10"
				    style="fill:#eee;stroke:#807777;stroke-width:5"></rect>
						<line
                x1="0"
                y1="25"
                x2="-10"
                y2="25"
                style="stroke:#807777;stroke-width:4"
                ></line>
                <circle
                class="controller"
                cx="25"
                cy="25"
                r="13"
                style="fill:rgba(255,255,255,0.95);stroke:#807777;stroke-width:5">
                </circle>
			</g>
			<circle connectable="input" class="connectable input-a" cx="-15"
				cy="25" r="5"/>
			`,
        beforeStart: function ()
        {
            let inputs =
                [
                    {
                        position: {x: -15, y: 25},
                        name: 'a',
                        elm: this.getElementsByClassName('input-a')[0]
                    }
                ];
            return ({inputs: inputs, outputs: []});
        },
        afterStart: function ()
        {
            this.onInputValueChange('a', () =>{
                if (this.inputHasTrue('a') === true)
                    this.elm.querySelector(".draggable .controller").style.fill = "rgb(0, 255, 43)";
                else
                    this.elm.querySelector(".draggable .controller").style.fill = "rgba(255,255,255,0.95)";
            })
        }
    };

}
