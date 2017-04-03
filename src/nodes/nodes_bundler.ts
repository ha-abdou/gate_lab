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
            <Position>{x: 10, y: 10}, <string>uid(), nodeName);

        return (node);
    }

    pushNode (node: Node)
    {
        this.nodesList.push(node);
        node.enable();
    }

    popNode(nodeId: string)
    {
        let l: number = this.nodesList.length;

        for (let i = 0; i < l ; i++)
        {
            if (this.nodesList[i].id === nodeId)
            {
                this.nodesList[i].disable();
                this.nodesList[i].remove();
                this.nodesList.splice(i, 1);
                break;
            }
        }
    }
    //todo
    getTemplate(templateName: string)
    {
        return (this.templateList[templateName]);
    }
}