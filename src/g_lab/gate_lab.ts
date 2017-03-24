/**
 * Created by abdou on 22/03/17.
 */
"use strict";
class GLab
{
    svgElm:         SVGElement;
    nodesBundler:   NodesBundler;//todo
    hiddenSegments: Segment[];

    constructor (containerId: string)
    {
        this.svgElm = <SVGElement>document.createElementNS(SVGNS, 'svg');
        this.svgElm.id = 'svg-container';
        document.getElementById(containerId).appendChild(this.svgElm);
        document.addEventListener('tryToConnect', this.onTryToConnect.bind(this), false);
        //document.addEventListener('nodeStartMoving',
        // this.onNodeStartMoving, false);
        //document.addEventListener('nodeMoved', this.onNodeMoved, false);
        this.nodesBundler = new NodesBundler();
    }

    loadNode (nodeName: string)
    {
        this.svgElm.appendChild( this.nodesBundler.load(nodeName).elm );
    }

    private onTryToConnect(e: CustomEvent)
    {
        this.tryToConnectHandler(e).then(
            (seg: Segment) => {
                //todo check if connection exist

            },
            (seg: Segment) => {

            });
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
                //todo remove path
                document.onmouseup = null;
                document.onmousemove = null;
                //if up on io
                //   resolve
                //else
                //   reject
                //

                resolve(tmp_seg);
                /*
                att = e.path[0].attributes.connectable ? e.path[0].attributes.connectable.value : '';
                if ((att === 'input' || att === 'output') && e.path[0].nodeName === 'circle'
                    && att != event.detail.typeName)
                    resolve(e.path[0]);
                else
                    reject("errorrrr");
                line.remove();
                line = null;
                */
            }
        });

        return (promise);
    }

    private onNodeStartMoving(e: CustomEvent)
    {
        this.nodesBundler.mapConnections(e.detail.node, (con: any) => {
            con.segment.hide();
        });
    }

    private onNodeMoved(e: CustomEvent)
    {
        //todo update inputs/outputs positions
        this.nodesBundler.mapConnections(e.detail.node, (con: any) => {
            con.segment.show();
        });
    }
}
