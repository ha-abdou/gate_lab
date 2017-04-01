/**
 * Created by abdou on 30/03/17.
 */
class HistoricManager
{
    historics:      Historic[];
    private historicIndex:  number;
    private isUndo:   boolean;
    private isRedo:   boolean;

    constructor ()
    {
        this.historics = [];
        this.isUndo = false;
        this.isRedo = false;
        this.historicIndex = -1;
    }

    push (historic: Historic)
    {
        if (!this.isRedo && !this.isUndo)
        {
            if (this.historicIndex + 1 < this.historics.length)
                this.historics.splice(this.historicIndex + 1,
                    this.historics.length - this.historicIndex );
            this.historics.push(historic);
            this.historicIndex++;
        }

    }

    undo ()
    {
        let his: Historic;

        if (this.historicIndex >= 0)
        {
            this.isUndo = true;
            his = this.historics[this.historicIndex];
            his.undo.func.apply(his.undo.thisArgc, his.undo.argcs);
            this.historicIndex--;
            this.isUndo = false;
        }
    }

    redo ()
    {
        let his: Historic;

        if (this.historicIndex < this.historics.length - 1)
        {
            this.isRedo = true;
            his = this.historics[this.historicIndex + 1];
            his.redo.func.apply(his.redo.thisArgc, his.redo.argcs);
            this.historicIndex++;
            this.isRedo = false;
        }
    }
}
