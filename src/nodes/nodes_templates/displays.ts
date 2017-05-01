/**
 * Created by abdou on 16/04/17.
 */
function loadDisplays (nodes: any)
{
    nodes.lamp = {
        content: `
			<g class="draggable">
				<rect width="50" height="50" rx="10" ry="10"
				    style="fill:#eee;stroke:#503b5b;stroke-width:5"></rect>
						<line
                x1="0"
                y1="25"
                x2="-10"
                y2="25"
                style="stroke:#503b5b;stroke-width:4"
                ></line>
                <circle
                class="controller"
                cx="25"
                cy="25"
                r="13"
                style="fill:rgba(255,255,255,0.95);stroke:#503b5b;stroke-width:5">
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
    //segments_display
    nodes.segments_display = {
        content: `
			<g class="draggable">
				<rect width="50" height="90" rx="10" ry="10"
				    style="fill:#eee;stroke:#503b5b;stroke-width:5"></rect>
				<line
                x1="0"
                y1="15"
                x2="-10"
                y2="15"
                style="stroke:#503b5b;stroke-width:4"
                ></line>
                <line
                x1="0"
                y1="35"
                x2="-10"
                y2="35"
                style="stroke:#503b5b;stroke-width:4"
                ></line>
                <line
                x1="0"
                y1="55"
                x2="-10"
                y2="55"
                style="stroke:#503b5b;stroke-width:4"
                ></line>
                <line
                x1="0"
                y1="75"
                x2="-10"
                y2="75"
                style="stroke:#503b5b;stroke-width:4"
                ></line>
                <text class="cont" x="12" y="60" font-family="Segment7Standard"
                font-size="45" fill="#ff1111">.</text>
			</g>
			<circle connectable="input" class="connectable input-a" cx="-15"
				cy="15" r="5"/>
			<circle connectable="input" class="connectable input-b" cx="-15"
				cy="35" r="5"/>
			<circle connectable="input" class="connectable input-c" cx="-15"
				cy="55" r="5"/>
			<circle connectable="input" class="connectable input-d" cx="-15"
				cy="75" r="5"/>
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
                    },
                    {
                        position: {x: -15, y: 55},
                        name: 'c',
                        elm: this.getElementsByClassName('input-c')[0]
                    },
                    {
                        position: {x: -15, y: 75},
                        name: 'd',
                        elm: this.getElementsByClassName('input-d')[0]
                    }
                ];
            return ({inputs: inputs, outputs: []});
        },
        afterStart: function ()
        {
            this.onInputValueChange('a', () =>{
                upDate.call(this);
            });
            this.onInputValueChange('b', () =>{
                upDate.call(this);
            });
            this.onInputValueChange('c', () =>{
                upDate.call(this);
            });
            this.onInputValueChange('d', () =>{
                upDate.call(this);
            });
            function upDate()
            {
                let val: number;

                val = this.inputHasTrue('a') + this.inputHasTrue('b') * 2 +
                    this.inputHasTrue('c') * 4 + this.inputHasTrue('d') * 8;
                if (val < 10)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = val.toString();
                else if (val === 10)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'A';
                else if (val === 11)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'B';
                else if (val === 12)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'C';
                else if (val === 13)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'D';
                else if (val === 14)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'E';
                else if (val === 15)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'F';

            }
        }
    };
}
