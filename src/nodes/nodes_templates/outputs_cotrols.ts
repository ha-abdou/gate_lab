/**
 * Created by abdou on 16/04/17.
 */

function loadOutputsControls (nodes: any)
{
    nodes.toggle_switch = {
        content: `
			<g class="draggable">
				<rect width="50" height="50" rx="10" ry="10"
				    style="fill:rgba(75, 75, 75, .4);stroke:#807777;stroke-width:5"></rect>
			</g>
			<line
			x1="50"
			y1="25"
			x2="60"
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
			<circle connectable="output" class="connectable output-a" cx="65"
				cy="25" r="5"/>
			`,
        beforeStart: function ()
        {
            let	outputs =
                [
                    {
                        position: {x: 65, y: 25},
                        name: 'a',
                        elm: this.getElementsByClassName('output-a')[0]
                    }
                ];
            return ({inputs: [], outputs: outputs});
        },
        afterStart: function($scope)
        {
            let con: any;

            if (!$scope.val)
                $scope.val = false;
            con = this.elm.getElementsByClassName('controller')[0];
            con.onclick = () =>{
                $scope.val = !$scope.val;
                upDate.call(this, $scope.val);
            };
            upDate.call(this, $scope.val);
            function upDate (val: boolean)
            {
                this.setOutputValue('a', val);
                if (val === true)
                    con.style.fill = "rgb(0, 255, 43)";
                else
                    con.style.fill = "rgba(255,255,255,0.95)";
            }
        }
    };
    nodes.clock = {
        content: `
			<g class="draggable">
				<rect width="50" height="50" rx="10" ry="10"
				    style="fill:rgba(75, 75, 75, .4);stroke:#807777;stroke-width:5"></rect>
			<line
			x1="10"
			y1="22"
			x2="10"
			y2="10"
			style="stroke:#000;stroke-width:4"
			></line>
			<line
			x1="8"
			y1="10"
			x2="25"
			y2="10"
			style="stroke:#000;stroke-width:4"
			></line>
			<line
			x1="23"
			y1="10"
			x2="23"
			y2="36"
			style="stroke:#000;stroke-width:4"
			></line>
			<line
			x1="36"
			y1="36"
			x2="36"
			y2="26"
			style="stroke:#000;stroke-width:4"
			></line>
			<line
			x1="38"
			y1="36"
			x2="21"
			y2="36"
			style="stroke:#000;stroke-width:4"
			></line>
			<line
			x1="50"
			y1="25"
			x2="60"
			y2="25"
			style="stroke:#807777;stroke-width:4"
			></line>
			</g>


			<circle connectable="output" class="connectable output-a" cx="65"
				cy="25" r="5"/>
			`,
        beforeStart: function ()
        {
            let	outputs =
                [
                    {
                        position: {x: 65, y: 25},
                        name: 'a',
                        elm: this.getElementsByClassName('output-a')[0]
                    }
                ];
            return ({inputs: [], outputs: outputs});
        },
        afterStart: function($interval)
        {
            this.setOutputValue('a', true);
            $interval(() => {
                this.setOutputValue('a', !this.getOutputValue('a'));
            }, 200);
        }
    };
    nodes.source_true = {
        content: `
			<g class="draggable">
				<rect width="50" height="50" rx="10" ry="10"
				    style="fill:rgba(75, 75, 75, .4);stroke:#807777;stroke-width:5"></rect>
			<line
			x1="15"
			y1="20"
			x2="27"
			y2="13"
			style="stroke:#000;stroke-width:4"
			></line>
			<line
			x1="28"
			y1="11"
			x2="28"
			y2="40"
			style="stroke:#000;stroke-width:4"
			></line>
			<line
			x1="50"
			y1="25"
			x2="60"
			y2="25"
			style="stroke:#807777;stroke-width:4"
			></line>
			</g>
			<circle connectable="output" class="connectable output-a" cx="65"
				cy="25" r="5"/>
			`,
        beforeStart: function ()
        {
            let	outputs =
                [
                    {
                        position: {x: 65, y: 25},
                        name: 'a',
                        elm: this.getElementsByClassName('output-a')[0]
                    }
                ];
            return ({inputs: [], outputs: outputs});
        },
        afterStart: function()
        {
            this.setOutputValue('a', true);
        }
    };
    nodes.source_false = {
        content: `
			<g class="draggable">
				<rect width="50" height="50" rx="10" ry="10"
				    style="fill:rgba(75, 75, 75, .4);stroke:#807777;stroke-width:5"></rect>
			<ellipse cx="25" cy="25" rx="12" ry="17"
			style="fill: rgba(0,0,0,0);stroke:#000;stroke-width:4"
			/>
			<line
			x1="50"
			y1="25"
			x2="60"
			y2="25"
			style="stroke:#807777;stroke-width:4"
			></line>
			</g>
			<circle connectable="output" class="connectable output-a" cx="65"
				cy="25" r="5"/>
			`,
        beforeStart: function ()
        {
            let	outputs =
                [
                    {
                        position: {x: 65, y: 25},
                        name: 'a',
                        elm: this.getElementsByClassName('output-a')[0]
                    }
                ];
            return ({inputs: [], outputs: outputs});
        },
        afterStart: function()
        {
            this.setOutputValue('a', false);
        }
    };

}