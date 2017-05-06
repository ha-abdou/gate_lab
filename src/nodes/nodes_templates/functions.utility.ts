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
				<rect class="rect-2" width="50" height="50"
				    style="fill:rgb(150, 150, 150);stroke:#000;stroke-width:2"></rect>

			</g>
			<g class="cont" style="cursor: text">
                <rect class="label-rect" x="15" y="15" height="20" width="20"
                    style="fill:#fff">
                </rect>
                <text class="label-text" x="17" y="30" font-size="15" dy="0">
                </text>
            </g>

			`,
        beforeStart: function ()
        {
            return ({inputs: [], outputs: []});
        },
        afterStart: function($scope)
        {
            let rect   = this.elm.querySelector(".label-rect");
            let rect_2 = this.elm.querySelector(".rect-2");
            let text   = this.elm.querySelector(".label-text");
            let con    = this.elm.querySelector(".cont");
            if (!$scope.txt)
                $scope.txt = 'Label..';

            con.onmousedown = ()=>{
                //todo $prompt
                $scope.txt = prompt("enter the text for the label:", $scope.txt);
                if ($scope.txt == null)
                    $scope.txt = "Label..";
                update();
            };

            function update ()
            {
                text.innerHTML = $scope.txt;
                rect.setAttribute("width", text.clientWidth + 5);
                rect_2.setAttribute("width", text.clientWidth + 35);
            }
            //todo afterStart
            setTimeout(()=>{
                update();
            },0);
        }
    };

}