"use strict";
class NodesBundler
{
    nodesList:      Node[];
    templateList:   any;//nodeTemplate[];

    constructor ()
    {
        this.templateList = loadTemplate();
        //todo typeScript compiler don't init var if is array of OGJS
        this.nodesList = [];
    }

    load (nodeName: string): Node
    {
        let	node: Node = new Node(this.getTemplate(nodeName),
            <Position>{x: 10, y: 10}, <string>uid());

        this.nodesList.push(node);
        //console.log(this.nodesList);
        node.upDateOutputs();
        return (node);
    }

    private getTemplate(templateName: string)
    {
        return (this.templateList[templateName]);
    }
}