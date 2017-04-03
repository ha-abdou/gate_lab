interface Copy
{
    svgContainer:
    {
        width:    number,
        height:   number,
        position: Position,
        scale:    number
    },
    nodesBundler:
    {
        nodesList:
        {
            name:       string,
            position:   Position,
            uid:        string,
            scope:      {},
            connections:
            {
                from:   string,
                to:     string
                uid:    string,
            }[]
        }[]
    }
}