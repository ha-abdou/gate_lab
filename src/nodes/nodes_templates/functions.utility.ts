'use strict';
//todo
function loadTemplate() {
    let nodes: {};

    nodes = {};
    loadOperators(nodes);
    loadOutputsControls(nodes);
    loadDisplays(nodes);
    loadOther(nodes);
    loadFlipFlops(nodes);
    return (nodes);
}

function loadOther (nodes: any)
{
    nodes.label = {
        content: `
			<g class="draggable">
				<rect width="50" height="50" rx="10" ry="10"
				    style="fill:rgba(75, 75, 75, .4);stroke:#807777;stroke-width:5"></rect>

			</g>
			<rect class="label-rect" x="15" y="15" height="20" width="20"
			    style="fill:#fff">
			</rect>
			<text x="0" y="0" font-size="15" dy="0">
        <tspan x="0" dy=".6em">tspan line 1</tspan>
        <tspan x="0" dy="1.2em">tspan line 2</tspan>
        <tspan x="0" dy="1.2em">tspan line 3</tspan>
    </text>
			<text class="label-text"></text>
			`,
        beforeStart: function ()
        {
            return ({inputs: [], outputs: []});
        },
        afterStart: function()
        {
            let rect = this.elm.querySelector(".label-rect");
            let text = this.elm.querySelector(".label-text");
            let s    = 'Label.. \ndd';

            rect.onmousedown = ()=>{
                //todo $prompt
                s = prompt(null, s);
                update();
            };

            function update ()
            {
                text.innerHTML = s;
                console.log(s);
            }
            //todo afterStart
            setTimeout(()=>{
                update();
            },0);
        }
    };

}