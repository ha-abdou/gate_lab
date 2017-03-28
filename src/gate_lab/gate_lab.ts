/**
 * Created by abdou on 22/03/17.
 */
"use strict";
class GLab
{
    svgElm:         SVGElement;
    nodesBundler:   NodesBundler;//todo

    constructor (containerId: string)
    {
        this.svgElm = <SVGElement>document.createElementNS(SVGNS, 'svg');
        this.svgElm.id = 'svg-container';
        this.svgElm.setAttribute('width', '500');
        this.svgElm.setAttribute('height', '500');
        this.svgElm.style.opacity = "1";
        document.getElementById(containerId).appendChild(this.svgElm);
        document.addEventListener('tryToConnect', this.onTryToConnect.bind(this), false);
        document.addEventListener('nodeStartMoving', GLab.onNodeStartMoving.bind(this), false);
        document.addEventListener('nodeMoved', this.onNodeMoved.bind(this), false);
        this.nodesBundler = new NodesBundler();
    }

    loadNode (nodeName: string)
    {
        this.svgElm.appendChild( this.nodesBundler.load(nodeName).elm );
    }

    private onTryToConnect(e: CustomEvent)
    {
        this.tryToConnectHandler(e).then(
            (success: any) => {
                let tmp: Segment;
                //todo check if connection exist
                //if connection not exist
                if (success.fromEvent.type === 'output')
                    tmp = new Segment(success.fromEvent.con, success.toEvent.property);
                else
                    tmp = new Segment(success.toEvent.property, success.fromEvent.con);
                success.toEvent.property.connections.push(tmp);
                success.fromEvent.con.connections.push(tmp);
                tmp.to.setValue(tmp.from.getValue());
                //todo update input value;
                this.svgElm.appendChild(tmp.elm);
            },
            (error: any) => {});
    }

    private tryToConnectHandler(event: CustomEvent): any
    {
        let tmp_seg = new PreviewSegment(event.detail.con.globalPosition());//preview_segment

        this.svgElm.appendChild(tmp_seg.elm);
        let promise = new Promise((resolve: any, reject: any) => {
            document.onmousemove = (e: MouseEvent) => {
                tmp_seg.upDate(<Position>{x: e.offsetX, y: e.offsetY});
            };
            document.onmouseup = (e: MouseEvent) => {
                let att: string;
                //todo remove path
                document.onmouseup = null;
                document.onmousemove = null;
                att = e.path[0].attributes.connectable ? e.path[0].attributes.connectable.value : '';
                if ((att === 'input' || att === 'output') && e.path[0].nodeName === 'circle'
                    && att != event.detail.type)
                    resolve({fromEvent: event.detail, toEvent: e.path[0]});
                else
                    reject();
                tmp_seg.elm.remove();
                tmp_seg = null;
            }
        });
        return (promise);
    }

    private static onNodeStartMoving(e: CustomEvent)
    {
        e.detail.node.mapConnections((seg: Segment) => {
            seg.remove();
        });
        e.detail.node.elm.remove();
        this.svgElm.appendChild(e.detail.node.elm);
    }

    private onNodeMoved(e: CustomEvent)
{
        //todo update inputs/outputs positions
        e.detail.node.mapConnections((seg: Segment) => {
            seg.upDate();
            this.svgElm.appendChild(seg.elm);
        });
        e.detail.node.elm.remove();
        this.svgElm.appendChild(e.detail.node.elm);
    }
}
