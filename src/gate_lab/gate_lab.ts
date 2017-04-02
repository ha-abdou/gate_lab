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
    }

    //todo
    loadNode (nodeName: string)
    {
        let node: Node;

        node = this.nodesBundler.load(nodeName);
        this.appendNode(node);
        //todo review get center
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
        this.svgContainer.appendChild(node.elm);
        this.nodesBundler.pushNode(node);
        this.historic_manager.push(<Historic>{
            undo: {func: this.deleteNode, thisArgc: this, argcs: [null, node]},
            redo: {func: this.appendNode, thisArgc: this, argcs: [node]}
        });
    }
    //todo remove node
    private deleteNode(e: CustomEvent, node: Node = null)
    {
        if (e)
            node = e.detail.node;
        this.nodesBundler.popNode(node.id);
        this.historic_manager.push(<Historic>{
            undo: {func: this.appendNode, thisArgc: this, argcs: [node]},
            redo: {func: this.deleteNode, thisArgc: this, argcs: [null, node]}
        });
    }

    private createConnection (from: Output, to: Input, seg: Segment = null)
    {
        //todo check if connection exist
        if (!seg)
            seg = new Segment(from, to);
        from.addConnection(seg);
        to.addConnection(seg);
        this.svgContainer.appendChild(seg.elm);
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
        seg.remove();
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
        let tmp_seg = new PreviewSegment(event.detail.con.globalPosition());

        this.svgContainer.appendChild(tmp_seg.elm);
        let promise = new Promise((resolve: any, reject: any) => {
            document.onmousemove = (e: MouseEvent) => {
                tmp_seg.upDate(<Position>{x: e.offsetX, y: e.offsetY});
            };
            document.onmouseup = (e: MouseEvent) => {
                let upElm:  SVGElement;

                upElm = <SVGElement>document.elementFromPoint(e.pageX, e.pageY);
                document.onmouseup = null;
                document.onmousemove = null;
                if (upElm.property &&
                        (upElm.property instanceof Input
                            ||
                        upElm.property instanceof Output))
                    resolve({fromEvent: event.detail, toEvent: upElm});
                else
                    reject();
                tmp_seg.remove();
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
        //todo review this
        e.detail.node.elm.remove();
        this.svgContainer.appendChild(e.detail.node.elm);
    }

    private onNodeMoved(e: CustomEvent, node: Node = null)
    {
        if (e)
            node = e.detail.node;
        node.mapConnections((seg: Segment) => {
            seg.upDate();
            this.svgContainer.appendChild(seg.elm);
        });
        //todo review this
        node.elm.remove();
        this.svgContainer.appendChild(node.elm);
        //
        function undoNodeMoved (node: Node, pos: Position)
        {
            node.move(pos);
            this.onNodeMoved(null, node);
        }
        this.historic_manager.push(<Historic>{
            undo: {func: undoNodeMoved, thisArgc: this,
                argcs: [node, e ? e.detail.lastPosition : null]},
            redo: {func: undoNodeMoved,thisArgc: this,
                argcs: [node, node.position]}
        });
    }
}
