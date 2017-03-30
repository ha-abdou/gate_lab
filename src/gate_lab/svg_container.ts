/**
 * Created by abdou on 29/03/17.
 */
class SVGContainer
{
    elm:        SVGElement;
    position:   Position;
    constructor (public width: number, public height: number)
    {
        this.elm = <SVGElement>document.createElementNS(SVGNS, 'svg');
        this.elm.id = 'svg-container';
        this.elm.setAttribute('width', width.toString());
        this.elm.setAttribute('height', height.toString());
        this.elm.style.position = 'relative';
        this.elm.onmousedown = this.dragAndDropHandler.bind(this);
    }

    center ()
    {
        //todo not move out the frame
        this.move(<Position>
        {
            x: this.elm.parentNode.clientWidth / 2 - this.width / 2,
            y: this.elm.parentNode.clientHeight / 2 - this.height / 2
        });
    }

    //todo
    getCenter (node: Node): Position
    {
        //console.log(node.elm.getBBox());
        return (<Position>{
            x: this.width / 2 - node.elm.getBBox().width / 2,
            y: this.height / 2 - node.elm.getBBox().height / 2
        });
    }

    move (to: Position)
    {
        this.position = to;
        this.elm.style.left = to.x.toString();
        this.elm.style.top = to.y.toString();
    }

    private dragAndDropHandler(event: Event) {
        let offset: Position;

        if (event.srcElement != this.elm)
            return;
        offset = <Position>{x: event.pageX - this.position.x,
            y: event.pageY - this.position.y};
        document.onmousemove = (e) => {
            this.move(<Position>{x: e.pageX  - offset.x, y: e.pageY -
            offset.y});
        };
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
}
