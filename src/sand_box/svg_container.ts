/**
 * Created by abdou on 29/03/17.
 */
class SVGContainer
{
    elm:            Element;
    lineContainer:  Element;
    nodeContainer:  Element;
    position:       Position;
    scale:          number;
    constructor (public width: number, public height: number)
    {
        this.scale = 1;
        this.elm = document.createElementNS(SVGNS, 'svg');
        this.elm.id = 'svg-container';
        this.elm.setAttribute('width', width.toString());
        this.elm.setAttribute('height', height.toString());
        this.elm.style.position = 'absolute';
        this.lineContainer = document.createElementNS(SVGNS, 'g');
        this.lineContainer.setAttribute("class", "line-container");
        this.nodeContainer = document.createElementNS(SVGNS, 'g');
        this.nodeContainer.setAttribute("class", "node-container");
        this.elm.onmousedown = this.dragAndDropHandler.bind(this);
        //todo
        setTimeout(()=>{
            this.elm.appendChild(this.lineContainer);
            this.elm.appendChild(this.nodeContainer);
        },0);
    }

    center ()
    {
        this.move(<Position>
        {
            x: window.screen.availWidth / 2 - this.width / 2,
            y: window.screen.availHeight / 2 - this.height / 2
        });
    }

    zoomOut ()
    {
        console.log('todo zoom out');
    }

    getCenter (): Position
    {
        return (<Position>{
            x: window.screen.availWidth / 2 - this.position.x,
            y: window.screen.availHeight / 2 - this.position.y
        });
    }
/*
    appendChild (elm: SVGElement)
    {
        this.elm.appendChild(elm);
    }
*/
    appendNode (elm: Element)
    {
        this.nodeContainer.appendChild(elm);
    }

    appendLine (elm: Element)
    {
        this.lineContainer.appendChild(elm);
    }

    move (to: Position)
    {
        this.position = to;
        this.elm.style.left = (to.x / this.scale).toString();
        this.elm.style.top = (to.y / this.scale).toString();
    }

    private dragAndDropHandler(event: Event)
    {
        let offset: Position;

        if (event.srcElement != this.elm)
            return;
        offset = <Position>{
            x: event.pageX - this.position.x ,
            y: event.pageY - this.position.y
        };
        document.onmousemove = (e) => {
            this.move(<Position>{
                x: e.pageX - offset.x,
                y: e.pageY - offset.y
            });
        };
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
}
