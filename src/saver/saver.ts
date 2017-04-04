
class Saver
{
    //todo Multi copy
    private copy:     Copy;
    private oCopy:    {};
    private conStack: {}[];

    constructor (public sandBox: GLab)
    {
    }

    save (): string
    {
        this.copy = {svgContainer: {}, nodesBundler: {nodesList: []}};
        this.saveSVGContainer();
        this.saveNodes();

        //this.sandBox.deleteAllNodes();
        return (JSON.stringify(this.copy));
    }

    open (copy: string): boolean
    {
        try
        {
            this.conStack = [];
            this.oCopy = JSON.parse(copy);
            this.createSVGContainer();
            this.createNodes();
            this.createConnections();
        }
        catch (e)
        {
            return (false);
        }
        return (true);
    }

    private createConnections ()
    {
        for (let cId in this.conStack)
        {
            let con = this.conStack[cId];
            let from: Output;
            let to: Input;
            let f: Node;
            let t: Node;

            f = this.sandBox.svgContainer.elm.getElementById(con.uid).property;
            t = this.sandBox.svgContainer.elm.getElementById(con.toUid).property;
            f.mapOutputs((output: Output)=>{
                if (output.name === con.from)
                    from = output;
            });
            t.mapInputs((input: Input)=>{
                if (input.name === con.to)
                    to = input;
            });
            this.sandBox.createConnection(from, to);
        }
    }

    private createNodes ()
    {
        for (let node in this.oCopy.nodesBundler.nodesList)
            this.createNode(this.oCopy.nodesBundler.nodesList[node]);

    }

    private createNode (nodeInfo: {})
    {
        let node: Node;

        node = new Node(
            this.sandBox.nodesBundler.getTemplate(nodeInfo.name),
            nodeInfo.position,
            nodeInfo.uid,
            nodeInfo.name,
            nodeInfo.$scope
        );

        this.sandBox.appendNode(node);
        this.conStack = this.conStack.concat(nodeInfo.connections);
    }

    private createSVGContainer ()
    {
        this.sandBox.svgContainer.move(this.oCopy.svgContainer.position);
    }

    private saveNodes ()
    {
        for (let node in this.sandBox.nodesBundler.nodesList)
            this.saveNode(this.sandBox.nodesBundler.nodesList[node]);
    }

    private saveNode (node: Node)
    {
        let nodeCopy: any;

        nodeCopy =
        {
            name:       node.name,
            position:   node.position,
            uid:        node.id,
            $scope:     node.nodeDependencies[1]['$scope'],
            connections: []
        };
        node.mapOutputs((output: Output)=>{
            output.mapConnections((con: any)=>{
                let conCopy: any;

                conCopy = {};
                conCopy.from = con.from.name;
                conCopy.uid = con.from.parentNode.id;
                conCopy.to = con.to.name;
                conCopy.toUid = con.to.parentNode.id;
                nodeCopy.connections.push(conCopy);
            });
        });
        this.copy.nodesBundler.nodesList.push(nodeCopy);
    }

    private saveSVGContainer ()
    {
        this.copy.svgContainer.width = this.sandBox.svgContainer.width;
        this.copy.svgContainer.height = this.sandBox.svgContainer.height;
        this.copy.svgContainer.position = this.sandBox.svgContainer.position;
        this.copy.svgContainer.scale = this.sandBox.svgContainer.scale;
    }
}
