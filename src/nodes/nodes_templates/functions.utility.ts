'use strict';
//todo
function loadTemplate() {
    let nodes: {};

    nodes = {};
    loadOperators(nodes);
    loadOutputsControls(nodes);
    loadDisplays(nodes);
    return (nodes);
}