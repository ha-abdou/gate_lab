/**
 * Created by abdou on 24/03/17.
 */
class TempaleteAPI{
    elm: SVGElement;
    constructor (private node: Node)
    {
        this.elm = node.elm;
    }

    setOutputValue (name: string, value: any)
    {
        for (let i = this.node.outputs.length - 1; i >= 0; i--)
        {
            if (this.node.outputs[i].name === name)
            {
                this.node.outputs[i].setValue(value);
                break;
            }
        }
    }

    getInputValues (name: string): any[]
    {
        for (let i = this.node.inputs.length - 1; i >= 0; i--)
            if (this.node.inputs[i].name === name)
                return (this.node.inputs[i].getValues());
        return ([]);
    }

    getInputLastValue (name: string): any
    {
        for (let i = this.node.inputs.length - 1; i >= 0; i--)
            if (this.node.inputs[i].name === name)
                return (this.node.inputs[i].getLastValue());
        return (null);
    }

    getOutputValue (name: string): any
    {
        for (let i = this.node.outputs.length - 1; i >= 0; i--)
            if (this.node.outputs[i].name === name)
                return (this.node.outputs[i].getValue());
        return (null);
    }

}
