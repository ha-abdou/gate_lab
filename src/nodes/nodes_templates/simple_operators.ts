/**
 * Created by abdou on 14/04/17.
 */
'use strict';
function simpleOperators (thum: string, updateOutput: any): {}
{
    return (
    {
        content: `
			<g class="draggable">
			    ` + thum + `
			</g>
			</g>
			<circle connectable="input" class="connectable input-a" cx="5"
				cy="13" r="5"/>
			<circle connectable="input" class="connectable input-b"
				cx="5" cy="39" r="5"/>
			<circle connectable="output" class="connectable output-c" cx="100"
				cy="26" r="5"/>
			`,
        beforeStart: function () {
            let inputs =
                [
                    {
                        position: {x: 5, y: 13},
                        name: 'a',
                        elm: this.getElementsByClassName('input-a')[0]
                    },
                    {
                        position: {x: 5, y: 39},
                        name: 'b',
                        elm: this.getElementsByClassName('input-b')[0]
                    }
                ];
            let outputs =
                [
                    {
                        position: {x: 100, y: 26},
                        name: 'c',
                        elm: this.getElementsByClassName('output-c')[0]
                    }
                ];
            return ({inputs: inputs, outputs: outputs});
        },
        afterStart: function()
        {
            this.setOutputValue('c', updateOutput.call(this));
            this.onInputValueChange('a', () =>{
                this.setOutputValue('c', updateOutput.call(this));
            });
            this.onInputValueChange('b', () =>{
                this.setOutputValue('c', updateOutput.call(this));
            });
        }
    });
}

function loadOperators (tmpls: any) {
    let op_nodes:any;
    let l:number;

    op_nodes =
        [
            {
                name: 'and',
                thum: '<g transform="translate(-29,-36)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                'd="M 44.000001,44.094484 C 36.824001,44.094484 25,44.094486 25,44.094486 L 25,18.095913 L 44.000001,18.094485 C 51.176001,18.094485 57.000001,23.918484 57.000001,31.094484 C 57.000001,38.270485 51.176001,44.094484 44.000001,44.094484 z M 57,31.094485 L 66.056394,31.094485 M 16,24.594486 L 25.00006,24.594486 M 16,37.594484 L 25.00006,37.594484"'
                + 'transform="scale(2,2)"></path>',
                updateOutput: function () {
                    return (this.inputHasTrue('a') && this.inputHasTrue('b'));
                }
            },
            {
                name: 'or',
                thum: '<g transform="translate(-36,-154)" ><path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                'd="M 25,77.094505 L 25,77.157005 C 27.198731,80.972177 28.46875,85.377717 28.46875,90.094505 C 28.46875,94.811293 27.198731,99.216833 25,103.03202 L 25,103.09452 L 28.46875,103.09452 L 38.46875,103.09452 C 48.079465,103.09452 56.468823,97.855209 60.96875,90.094505 C 56.468824,82.333802 48.079464,77.094506 38.46875,77.094505 L 28.46875,77.094505 L 25,77.094505 z M 60.999719,90.094512 L 70.000279,90.094512 M 18.5,83.594514 L 27.50006,83.594514 M 18.5,96.594512 L 27.50006,96.594512"'
                + 'transform="scale(2)"></path>',
                updateOutput: function () {
                    return (this.inputHasTrue('a') || this.inputHasTrue('b'));
                }
            },
            {
                name: 'nor',
                thum: '<g transform="translate(-144,-154)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                'd="M 95,77.094482 L 95,77.156982 C 97.19873,80.972154 98.46875,85.377694 98.46875,90.094482 C 98.46875,94.81127 97.19873,99.21681 95,103.03199 L 95,103.09449 L 98.46875,103.09449 L 108.46875,103.09449 C 118.07946,103.09449 126.46882,97.855186 130.96875,90.094482 C 126.46882,82.333779 118.07946,77.094483 108.46875,77.094482 L 98.46875,77.094482 L 95,77.094482 z M 135,90.094848 C 135,91.198848 134.104,92.094848 133,92.094848 C 131.896,92.094848 131,91.198848 131,90.094848 C 131,88.990848 131.896,88.094848 133,88.094848 C 134.104,88.094848 135,88.990848 135,90.094848 z M 134.99973,90.094481 L 144.00032,90.094481 M 88.5,83.594487 L 97.50006,83.594487 M 88.5,96.594485 L 97.50006,96.594485"'
                + 'transform="scale(1.7,2)"></path>',
                updateOutput: function () {
                    return (!(this.inputHasTrue('a') || this.inputHasTrue('b')));
                }
            },
            {
                name: 'nand',
                thum: '<g transform="translate(-172,-36)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                'd="M 114,44.09448 C 106.824,44.09448 95,44.094482 95,44.094482 L 95,18.095909 L 114,18.094481 C 121.176,18.094481 127,23.91848 127,31.09448 C 127,38.270481 121.176,44.09448 114,44.09448 z M 131,31.094482 C 131,32.198482 130.104,33.094482 129,33.094482 C 127.896,33.094482 127,32.198482 127,31.094482 C 127,29.990482 127.896,29.094482 129,29.094482 C 130.104,29.094482 131,29.990482 131,31.094482 z M 130.9997,31.094481 L 135.99976,31.094481 M 87,24.594478 L 95.00006,24.594478 M 87,37.594476 L 95.00006,37.594476"'
                + 'transform="scale(2)"></path>',
                updateOutput: function () {
                    return (!(this.inputHasTrue('a') && this.inputHasTrue('b')));
                }
            },
            {
                name: 'xor',
                thum: '<g transform="translate(-32,-272)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                'd="M 30,136.09446 L 30,136.15696 C 32.198731,139.97213 33.46875,144.37767 33.46875,149.09446 C 33.46875,153.81125 32.198731,158.21679 30,162.03196 L 30,162.09446 L 33.46875,162.09446 L 43.46875,162.09446 C 53.079465,162.09446 61.468823,156.85516 65.96875,149.09446 C 61.468824,141.33376 53.079464,136.09446 43.46875,136.09446 L 33.46875,136.09446 L 30,136.09446 z M 25,136.15696 C 27.198731,139.97213 28.46875,144.37767 28.46875,149.09446 C 28.46875,153.81125 27.198731,158.21679 25,162.03196 M 65.999971,149.09448 L 75.000027,149.09448 M 18.5,142.59446 L 27.50006,142.59446 M 18.5,155.59446 L 27.50006,155.59446"'
                + 'transform="scale(1.8,2)"></path>',
                updateOutput: function () {
                    return ((this.inputHasTrue('a') && !this.inputHasTrue('b'))
                    ||
                    (!this.inputHasTrue('a') && this.inputHasTrue('b')));
                }
            },
            {
                name: 'nxor',
                thum: '<g transform="translate(-149,-272)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                'd="M 100,136.09448 L 100,136.15698 C 102.19873,139.97215 103.46875,144.37769 103.46875,149.09448 C 103.46875,153.81127 102.19873,158.21681 100,162.03198 L 100,162.09448 L 103.46875,162.09448 L 113.46875,162.09448 C 123.07946,162.09448 131.46882,156.85518 135.96875,149.09448 C 131.46882,141.33378 123.07946,136.09448 113.46875,136.09448 L 103.46875,136.09448 L 100,136.09448 z M 95,136.15698 C 97.19873,139.97215 98.46875,144.37769 98.46875,149.09448 C 98.46875,153.81127 97.19873,158.21681 95,162.03198 M 140,149.09521 C 140,150.19921 139.104,151.09521 138,151.09521 C 136.896,151.09521 136,150.19921 136,149.09521 C 136,147.99121 136.896,147.09521 138,147.09521 C 139.104,147.09521 140,147.99121 140,149.09521 z M 140,149.0945 L 149.00006,149.0945 M 88.5,142.59448 L 97.50006,142.59448 M 88.5,155.59448 L 97.50006,155.59448"'
                + 'transform="scale(1.7,2)"></path>',
                updateOutput: function () {
                    return !((this.inputHasTrue('a') && !this.inputHasTrue('b'))
                    ||
                    (!this.inputHasTrue('a') && this.inputHasTrue('b')));
                }
            },
        ];
    l = op_nodes.length;
    for (let i = 0; i < l; i++)
        tmpls[op_nodes[i].name] = simpleOperators(op_nodes[i].thum, op_nodes[i].updateOutput);

    tmpls.not = {
        content: `
			<g class="draggable">
			    <g transform="translate(-27,-385)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"
                d="M 48.499947,208.09448 C 48.499947,209.19848 47.603947,210.09448 46.499948,210.09448 C 45.395948,210.09448 44.499948,209.19848 44.499948,208.09448 C 44.499948,206.99048 45.395948,206.09448 46.499948,206.09448 C 47.603947,206.09448 48.499947,206.99048 48.499947,208.09448 z M 25,219.09448 L 25,197.09448 L 43.985582,208.09448 L 25,219.09448 z M 48.5,208.09448 L 57.50006,208.09448 M 16,208.09448 L 25.00006,208.09448"
                transform="scale(2,2)"></path>
			</g>
			</g>
			<circle connectable="input" class="connectable input-a" cx="0"
				cy="31" r="5"/>
			<circle connectable="output" class="connectable output-c" cx="90"
				cy="31" r="5"/>
			`,
        beforeStart: function () {
            let inputs =
                [
                    {
                        position: {x: 0, y: 31},
                        name: 'a',
                        elm: this.getElementsByClassName('input-a')[0]
                    }
                ];
            let outputs =
                [
                    {
                        position: {x: 90, y: 31},
                        name: 'c',
                        elm: this.getElementsByClassName('output-c')[0]
                    }
                ];
            return ({inputs: inputs, outputs: outputs});
        },
        afterStart: function () {
            this.setOutputValue('c', !this.inputHasTrue('a'));
            this.onInputValueChange('a', () => {
                this.setOutputValue('c', !this.inputHasTrue('a'));
            });
        }
    };
    tmpls.tri_state = {
        content: `
			<g class="draggable">
			    <line
                x1="45"
                y1="-10"
                x2="45"
                y2="30"
                style="stroke:#000;stroke-width:2"
			    ></line>
			    <g transform="translate(-27,-385)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"
                d="M 48.499947,208.09448  z M 25,219.09448 L 25,197.09448 L 43.985582,208.09448 L 25,219.09448 z M 43.5,208.09448 L 57.50006,208.09448 M 16,208.09448 L 25.00006,208.09448"
                transform="scale(2,2)"></path>
			    </g>
			</g>
			<circle connectable="input" class="connectable input-a" cx="0"
				cy="31" r="5"/>
			<circle connectable="input" class="connectable input-b" cx="45"
				cy="-10" r="5"/>
			<circle connectable="output" class="connectable output-c" cx="90"
				cy="31" r="5"/>
			`,
        beforeStart: function () {
            let inputs =
                [
                    {
                        position: {x: 0, y: 31},
                        name: 'a',
                        elm: this.getElementsByClassName('input-a')[0]
                    },
                    {
                        position: {x: 45, y: -10},
                        name: 'b',
                        elm: this.getElementsByClassName('input-b')[0]
                    }
                ];
            let outputs =
                [
                    {
                        position: {x: 90, y: 31},
                        name: 'c',
                        elm: this.getElementsByClassName('output-c')[0]
                    }
                ];
            return ({inputs: inputs, outputs: outputs});
        },
        afterStart: function () {
            upDate.call(this);
            this.onInputValueChange('b', () => {
                upDate.call(this);
            });
            this.onInputValueChange('a', () => {
                upDate.call(this);
            });
            function upDate ()
            {
                if (this.inputHasTrue('b') === true)
                    this.setOutputValue('c', this.inputHasTrue('a'));
                else
                    this.setOutputValue('c', null);
            }
        }
    };

}