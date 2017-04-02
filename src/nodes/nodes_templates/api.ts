/**
 * Created by abdou on 24/03/17.
 */
class TempaleteAPI{
    elm: SVGElement;

    constructor (private node: Node)
    {
        this.elm = node.elm;
    }

    onInputValueChange (name: string, f: any)
    {
        this.node.mapInputs((input) =>{
            if (input.name === name)
                input.onValueChange = f;
        })
    }

    setOutputValue (name: string, value: any)
    {
        this.node.mapOutputs((output) => {
            if (output.name === name)
                output.setValue(value);
        });
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
