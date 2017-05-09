/**
 * Created by abdou on 22/03/17.
 */
//formila
"use strict";
class SandBox
{
    nodesBundler:       NodesBundler;//todo
    svgContainer:       SVGContainer;
    historic_manager:   HistoricManager;
    saver:              Saver;
    position:           Position;
    width:              number;
    height:             number;
    constructor (containerId: string)
    {
        this.width = 2400;
        this.height = 1350;
        this.svgContainer = new SVGContainer(this.width, this.height);
        document.getElementById(containerId).appendChild(this.svgContainer.elm);
        this.svgContainer.center();
        this.nodesBundler = new NodesBundler();
        this.historic_manager = new HistoricManager();
        this.saver = new Saver(this);
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
        let cen:  Position;

        node = this.nodesBundler.load(nodeName);
        this.appendNode(node);
        cen = this.svgContainer.getCenter(node);
        node.move(<Position>{
            x: cen.x - node.elm.getBBox().width / 2,
            y: cen.y - node.elm.getBBox().height / 2
        });
    }

    setStatus (s: number)
    {
        LABSTATUS = s;
        if (s === ZOOMOUT)
        {
            this.svgContainer.zoomOut();
            LABSTATUS = NORMAL;
        }
    }

    undo ()
    {
        this.historic_manager.undo();
    }

    redo ()
    {
        this.historic_manager.redo();
    }

    save ()
    {
        let file: string;

        file = this.saver.save();
        localStorage.setItem('save', file);
    }

    load ()
    {
        //let tmp: string;

        //tmp = this.saver.save();
        //this.deleteAllNodes();
        if (this.saver.open(localStorage.getItem('save')))
            this.historic_manager.clear();
        else
        {
           // this.deleteAllNodes();
            //this.saver.open(tmp);
        }
    }
    //todo
    download ()
    {
        let name: string;
        let file: string;

        name = prompt('file name: ','logic_gate');
        file = this.saver.save();
        download(file, name + '.txt', 'text/plain');
    }

    upLoad (s: string)
    {
        let tmp: string;

        tmp = this.saver.save();
        this.deleteAllNodes();
        if (s && this.saver.open(s))
            this.historic_manager.clear();
        else
            this.saver.open(tmp);
    }

    deleteAllNodes ()
    {
        this.svgContainer.elm.innerHTML = '';
        this.nodesBundler.nodesList = [];
        /*
        for (let node in this.nodesBundler.nodesList)
        {
            this.deleteNode(null, this.nodesBundler.nodesList[node]);
        }*/
    }

    newSheet ()
    {
        this.deleteAllNodes();
        this.historic_manager.clear();
        window.location.reload();
    }

    appendNode(node: Node)
    {
        this.svgContainer.appendNode(node.elm);
        this.nodesBundler.pushNode(node);
        this.historic_manager.push(<Historic>{
            undo: {func: this.deleteNode, thisArgc: this, argcs: [null, node]},
            redo: {func: this.appendNode, thisArgc: this, argcs: [node]}
        });
    }
    createConnection (from: Output, to: Input, seg: Segment = null)
    {
        //todo check if connection exist
        if (!seg)
            seg = new Segment(from, to);
        from.addConnection(seg);
        to.addConnection(seg);
        this.svgContainer.appendLine(seg.elm);
        this.historic_manager.push(<Historic>{
            undo: {func: this.deleteConnection, thisArgc: this, argcs: [null, seg]},
            redo: {func: this.createConnection, thisArgc: this, argcs: [seg.from, seg.to, seg]}
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

        this.svgContainer.appendLine(tmp_seg.elm);
        let promise = new Promise((resolve: any, reject: any) => {
            document.onmousemove = (e: MouseEvent) => {
                tmp_seg.upDate(<Position>{x: e.offsetX, y: e.offsetY});
            };
            document.onmouseup = (e: MouseEvent) => {
                let upElm:  SVGElement;

                tmp_seg.remove();
                upElm = <SVGElement>document.elementFromPoint(e.pageX, e.pageY);
                document.onmouseup = null;
                document.onmousemove = null;
                if (upElm.property
                    &&
                    (upElm.property instanceof Input || upElm.property instanceof Output)
                    &&
                    upElm.property.constructor.name !== event.detail.con.constructor.name)
                    resolve({fromEvent: event.detail, toEvent: upElm});
                else
                    reject();
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
        this.svgContainer.appendNode(e.detail.node.elm);
    }

    private onNodeMoved(e: CustomEvent, node: Node = null)
    {
        if (e)
            node = e.detail.node;
        node.mapConnections((seg: Segment) => {
            seg.upDate();
            this.svgContainer.appendLine(seg.elm);
        });
        //todo review this
        node.elm.remove();
        this.svgContainer.appendNode(node.elm);
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

/*
 {"
 svgContainer":{"width":2400,"height":1350,"position":{"x":-541.5,"y":-303},"scale":1},"nodesBundler":{"nodesList":[{"name":"display","position":{"x":1176.5,"y":655},"uid":"_6e7a2","connections":[]}]}}
 */
