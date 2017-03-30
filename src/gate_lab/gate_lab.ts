/**
 * Created by abdou on 22/03/17.
 */
//formila
"use strict";
class GLab
{
    nodesBundler:       NodesBundler;//todo
    position:           Position;
    width:              number;
    height:             number;
    svgContainer:       SVGContainer;
    historic_manager:   HistoricManager;
    constructor (containerId: string)
    {
        this.width = 800;
        this.height = 300;
        this.svgContainer = new SVGContainer(this.width, this.height);
        document.getElementById(containerId).appendChild(this.svgContainer.elm);
        this.svgContainer.center();
        this.nodesBundler = new NodesBundler();
        this.historic_manager = new HistoricManager();
        document.addEventListener('tryToConnect', this.onTryToConnect.bind(this), false);
        document.addEventListener('nodeStartMoving', this.onNodeStartMoving.bind(this), false);
        document.addEventListener('nodeMoved', this.onNodeMoved.bind(this), false);
        document.addEventListener('deleteConnection', this.deleteConnection.bind(this), false);
        document.addEventListener('deleteNode', this.deleteNode.bind(this), false);
        //
    }

    loadNode (nodeName: string)
    {
        let node: Node;

        node = this.nodesBundler.load(nodeName);
        this.appendNode(node);
        node.move(this.svgContainer.getCenter(node));
    }

    setStatus (s: number)
    {
        LABSTATUS = s;
    }

    undo ()
    {
        this.historic_manager.undo();
    }

    redo ()
    {
        this.historic_manager.redo();
    }

    private appendNode(node: Node)
    {
        console.log("append ", node);
        this.svgContainer.elm.appendChild(node.elm);
        this.historic_manager.push(<Historic>{
            undo: {func: this.deleteNode, thisArgc: this, argcs: [null, node]},
            redo: {func: this.appendNode, thisArgc: this, argcs: [node]}
        });
    }

    private deleteNode(e: CustomEvent, node: Node)
    {
        console.log('delete', node);
        if (e)
            node = e.detail.node;
        //todo review this
        node.mapConnections((seg: Segment, index: number) => {
            seg.from.removeConnection(seg);
            seg.to.removeConnection(seg);
            seg.elm.remove();
            seg = null;
        });
        this.nodesBundler.popNode(node.id);
    }

    private createConnection (from: Output, to: Input, seg: Segment = null)
    {
        //todo check if connection exist
        //console.log(from, to);
        if (!seg)
            seg = new Segment(from, to);
        from.addConnection(seg);
        to.addConnection(seg);
        this.svgContainer.elm.appendChild(seg.elm);
        this.historic_manager.push(<Historic>{
            undo: {func: this.deleteConnection, thisArgc: this, argcs: [null, seg]},
            redo: {func: this.createConnection, thisArgc: this, argcs: [seg.from, seg.to, seg]}
        });
    }

    private deleteConnection(e: CustomEvent, seg: Segment = null)
    {
        if (e)
            seg = e.detail.segment;
        this.historic_manager.push(<Historic>{
            undo: {func: this.createConnection, thisArgc: this, argcs: [seg.from, seg.to]},
            redo: {func: this.deleteConnection, thisArgc: this, argcs: [null, seg]}
        });
        seg.from.removeConnection(seg);
        seg.to.removeConnection(seg);
        seg.elm.remove();
        seg = null;
    }

    private onTryToConnect(e: CustomEvent)
    {
        this.tryToConnectHandler(e).then(
            (success: any) => {
                if (success.fromEvent.type === 'output')
                    this.createConnection(success.fromEvent.con, success.toEvent.property);
                else
                    this.createConnection(success.toEvent.property, success.fromEvent.con);
            },
            (error: any) => {});
    }

    private tryToConnectHandler(event: CustomEvent): any
    {
        let tmp_seg = new PreviewSegment(event.detail.con.globalPosition());//preview_segment

        this.svgContainer.elm.appendChild(tmp_seg.elm);
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

    private onNodeStartMoving(e: CustomEvent)
    {
        e.detail.node.mapConnections((seg: Segment) => {
            seg.remove();
        });
        e.detail.node.elm.remove();
        this.svgContainer.elm.appendChild(e.detail.node.elm);
    }

    private onNodeMoved(e: CustomEvent)
    {
        //todo update inputs/outputs positions
        e.detail.node.mapConnections((seg: Segment) => {
            seg.upDate();
            this.svgContainer.elm.appendChild(seg.elm);
        });
        e.detail.node.elm.remove();
        this.svgContainer.elm.appendChild(e.detail.node.elm);
    }

}
