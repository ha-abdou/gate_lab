"use strict";
var SVGNS = "http://www.w3.org/2000/svg";
var NORMAL = 0;
var MOVE = 1;
var DELETE = 2;
var ZOOMOUT = 3;
var LABSTATUS = NORMAL;
"use strict";
window.lab = {};
function main() {
    lab = new SandBox("lab-svg");
    set_edit(lab.setStatus, NORMAL);
    if (!localStorage.getItem('save')) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                localStorage.setItem('save', this.responseText);
                window.onbeforeunload = null;
                window.location.reload();
            }
        };
        xhttp.open("GET", "examples/1.txt", true);
        xhttp.send();
    }
    else
        lab.load();
    window.onbeforeunload = function () {
        lab.save();
        return null;
    };
}
var _edit = document.querySelector("#edit-elm a");
var _delete = document.querySelector("#delete-elm a");
var _more_menu = document.getElementsByClassName("more-panel")[0];
var _before_more_menu = document.getElementsByClassName("before-panel")[0];
var _file_input = document.getElementById("file-input");
function set_edit(f, s) {
    _set(_edit);
    _unset(_delete);
    f(s);
}
function set_delete(f, s) {
    _set(_delete);
    _unset(_edit);
    f(s);
}
function _set(node) {
    node.style.background = "rgb(68, 70, 122)";
    node.style.color = "white";
}
function _unset(node) {
    node.style.background = "white";
    node.style.color = "rgb(68, 70, 122)";
}
function show_more_menu() {
    _before_more_menu.style.display = 'block';
    _more_menu.style.display = 'block';
}
function close_more_menu() {
    _before_more_menu.style.display = 'none';
    _more_menu.style.display = 'none';
}
function upload() {
    if (_file_input.value == "") {
        alert("please select file");
        return;
    }
    var reader = new FileReader();
    reader.onload = function () {
        localStorage.setItem('save', reader.result);
        window.onbeforeunload = null;
        window.location.reload();
    };
    reader.readAsText(_file_input.files[0]);
}
"use strict";
Function.prototype.run = function (thisArg, dependencies) {
    if (typeof dependencies !== 'object' || dependencies == null || dependencies.constructor === Array)
        throw 'error in params type';
    var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    function getParamNames(func) {
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (result === null)
            result = [];
        return result;
    }
    var params = getParamNames(this);
    var args = [];
    var l = params.length;
    for (var i = 0; i < l; ++i) {
        if (dependencies.hasOwnProperty(params[i])) {
            args.push(dependencies[params[i]]);
        }
        else {
            args.push(undefined);
        }
    }
    return this.apply(thisArg, args);
};
function download(text, name, type) {
    var a;
    var file;
    a = document.createElement("a");
    file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
function uid() {
    return '_' + Math.floor((1 + Math.random()) * 0x100000).toString(16).substring(1);
}
function $interval(func, time, intervals) {
    var tId;
    var i;
    i = intervals.length;
    tId = setInterval(function () {
        if (!intervals[i].isPause) {
            func();
        }
    }, time);
    intervals.push({
        pause: function () { intervals[i].isPause = true; },
        unPause: function () { intervals[i].isPause = false; },
        isPause: false,
        func: func,
        time: time,
        startAt: (new Date()).getTime(),
        tId: tId
    });
    return (i);
}
function $clearInterval(tId, intervals) {
    clearInterval(intervals[tId].tId);
    intervals.splice(tId, 1);
}
function $timeout(func, time, timeouts) {
    var tId;
    var i;
    i = timeouts.length;
    tId = setTimeout(function () {
        if (!timeouts[tId].isPause) {
            func();
            delete timeouts[tId];
        }
    }, time);
    timeouts.push({
        pause: function () { timeouts[i].isPause = true; },
        unPause: function () { timeouts[i].isPause = false; },
        isPause: false,
        func: func,
        time: time,
        startAt: (new Date()).getTime(),
        tId: tId
    });
    return (i);
}
function $clearTimeout(tId, timeouts) {
    clearTimeout(timeouts[tId].tId);
    delete timeouts[tId];
}
var HistoricManager = (function () {
    function HistoricManager() {
        this.historics = [];
        this.isUndo = false;
        this.isRedo = false;
        this.historicIndex = -1;
    }
    HistoricManager.prototype.push = function (historic) {
        if (!this.isRedo && !this.isUndo) {
            if (this.historicIndex + 1 < this.historics.length)
                this.historics.splice(this.historicIndex + 1, this.historics.length - this.historicIndex);
            this.historics.push(historic);
            this.historicIndex++;
        }
    };
    HistoricManager.prototype.undo = function () {
        var his;
        if (this.historicIndex >= 0) {
            this.isUndo = true;
            his = this.historics[this.historicIndex];
            his.undo.func.apply(his.undo.thisArgc, his.undo.argcs);
            this.historicIndex--;
            this.isUndo = false;
        }
    };
    HistoricManager.prototype.redo = function () {
        var his;
        if (this.historicIndex < this.historics.length - 1) {
            this.isRedo = true;
            his = this.historics[this.historicIndex + 1];
            his.redo.func.apply(his.redo.thisArgc, his.redo.argcs);
            this.historicIndex++;
            this.isRedo = false;
        }
    };
    HistoricManager.prototype.clear = function () {
        this.historicIndex = -1;
        this.historics = [];
    };
    return HistoricManager;
})();
"use strict";
var NodesBundler = (function () {
    function NodesBundler() {
        this.templateList = loadTemplate();
        this.nodesList = [];
    }
    NodesBundler.prototype.load = function (nodeName) {
        var node = new Node(this.getTemplate(nodeName), { x: 10, y: 10 }, uid(), nodeName);
        return (node);
    };
    NodesBundler.prototype.pushNode = function (node) {
        this.nodesList.push(node);
        node.enable();
    };
    NodesBundler.prototype.popNode = function (nodeId) {
        var l = this.nodesList.length;
        for (var i = 0; i < l; i++) {
            if (this.nodesList[i].id === nodeId) {
                this.nodesList[i].disable();
                this.nodesList[i].remove();
                this.nodesList.splice(i, 1);
                break;
            }
        }
    };
    NodesBundler.prototype.getTemplate = function (templateName) {
        return (this.templateList[templateName]);
    };
    return NodesBundler;
})();
"use strict";
var Input = (function () {
    function Input(elm, position, name, parentNode) {
        this.elm = elm;
        this.position = position;
        this.name = name;
        this.parentNode = parentNode;
        elm.onmousedown = this.onMouseDown.bind(this);
        elm.property = this;
        this.connections = [];
        this.value = null;
    }
    Input.prototype.enableConnections = function () {
        this.mapConnections(function (con) {
            con.from.addConnection(con);
            con.show();
        });
    };
    Input.prototype.disableConnections = function () {
        this.mapConnections(function (con) {
            con.from.removeConnection(con);
            con.hide();
        });
    };
    Input.prototype.globalPosition = function () {
        return {
            x: this.position.x + this.parentNode.position.x,
            y: this.position.y + this.parentNode.position.y
        };
    };
    Input.prototype.setValue = function (value) {
        if (this.value != value) {
            this.value = value;
            if (typeof this.onValueChange === "function")
                this.onValueChange();
        }
    };
    Input.prototype.addConnection = function (seg) {
        this.connections.push(seg);
        this.setValue(seg.from.getValue());
    };
    Input.prototype.removeConnection = function (seg) {
        var _this = this;
        this.mapConnections(function (con, index) {
            if (seg == con) {
                _this.connections.splice(index, 1);
                if (_this.connections.length === 0)
                    _this.setValue(null);
                else
                    _this.setValue(_this.connections[0].from.getValue());
            }
        });
    };
    Input.prototype.getValues = function () {
        var values = [];
        for (var i = this.connections.length - 1; i >= 0; i--)
            values.push(this.connections[i].from.getValue());
        return (values);
    };
    Input.prototype.getLastValue = function () {
        return (this.value);
    };
    Input.prototype.mapConnections = function (f) {
        var i;
        for (i = this.connections.length - 1; i >= 0; i--)
            f.call(null, this.connections[i], i);
    };
    Input.prototype.onMouseDown = function (event) {
        var _this = this;
        var c_event;
        if (LABSTATUS !== NORMAL)
            return;
        this.elm.onmouseup = function () {
            _this.elm.onmouseup = null;
            _this.elm.onmousemove = null;
        };
        this.elm.onmousemove = function () {
            _this.elm.onmouseup = null;
            _this.elm.onmousemove = null;
            c_event = new CustomEvent('tryToConnect', { detail: { con: _this, type: 'input' } });
            document.dispatchEvent(c_event);
        };
    };
    return Input;
})();
"use strict";
var Node = (function () {
    function Node(template, position, id, name, $scope) {
        if ($scope === void 0) { $scope = {}; }
        this.position = position;
        this.id = id;
        this.name = name;
        this.$scope = $scope;
        var dragCon;
        var IO;
        this.inputs = [];
        this.outputs = [];
        this.elm = document.createElementNS(SVGNS, 'g');
        this.elm.innerHTML = template.content;
        this.elm.setAttributeNS(null, "class", 'node');
        this.elm.setAttributeNS(null, "id", id);
        this.move(position);
        dragCon = this.elm.getElementsByClassName('draggable')[0];
        dragCon.onmousedown = this.onMouseDown.bind(this);
        this.makeDependencies();
        this.tempaleteAPI = new TempaleteAPI(this);
        IO = template.beforeStart.run(this.elm, this.nodeDependencies[1]);
        this.elm.property = this;
        this.addInputs(IO.inputs);
        this.addOutputs(IO.outputs);
        template.afterStart.run(this.tempaleteAPI, this.nodeDependencies[1]);
    }
    Node.prototype.move = function (to) {
        this.position = to;
        this.elm.setAttributeNS(null, "transform", "translate(" + (to.x) + ", " + (to.y) + ")");
    };
    Node.prototype.mapConnections = function (f) {
        this.mapInputs(function (input, index) {
            input.mapConnections(f);
        });
        this.mapOutputs(function (output, index) {
            output.mapConnections(f);
        });
    };
    Node.prototype.mapInputs = function (f) {
        var i;
        for (i = this.inputs.length - 1; i >= 0; i--) {
            f.call(null, this.inputs[i], i);
        }
    };
    Node.prototype.mapOutputs = function (f) {
        var i;
        for (i = this.outputs.length - 1; i >= 0; i--) {
            f.call(null, this.outputs[i], i);
        }
    };
    Node.prototype.remove = function () {
        this.elm.remove();
    };
    Node.prototype.enable = function () {
        this.enableConnections();
        this.enableIntervalsTimeouts();
    };
    Node.prototype.disable = function () {
        this.disableIntervalsTimeouts();
        this.disableConnections();
    };
    Node.prototype.enableConnections = function () {
        this.mapInputs(function (input) {
            input.enableConnections();
        });
        this.mapOutputs(function (output) {
            output.enableConnections();
        });
    };
    Node.prototype.disableConnections = function () {
        this.mapInputs(function (input) {
            input.disableConnections();
        });
        this.mapOutputs(function (output) {
            output.disableConnections();
        });
    };
    Node.prototype.enableIntervalsTimeouts = function () {
        for (var interval in this.nodeDependencies[0].intervals)
            this.nodeDependencies[0].intervals[interval].unPause();
        for (var timeout in this.nodeDependencies[0].timeouts)
            this.nodeDependencies[0].timeouts[timeout].unPause();
    };
    Node.prototype.disableIntervalsTimeouts = function () {
        for (var interval in this.nodeDependencies[0].intervals)
            this.nodeDependencies[0].intervals[interval].pause();
        for (var timeout in this.nodeDependencies[0].timeouts)
            this.nodeDependencies[0].timeouts[timeout].pause();
    };
    Node.prototype.onMouseDown = function (event) {
        if (LABSTATUS === NORMAL)
            this.dragAndDropHandler(event);
        else if (LABSTATUS === 2)
            document.dispatchEvent(new CustomEvent('deleteNode', { detail: { node: this } }));
    };
    Node.prototype.dragAndDropHandler = function (event) {
        var _this = this;
        var c_event;
        var offset;
        offset = { x: event.clientX - this.position.x,
            y: event.clientY - this.position.y };
        c_event = new CustomEvent('nodeStartMoving', { detail: { node: this } });
        document.dispatchEvent(c_event);
        document.onmousemove = function (e) {
            _this.move({ x: e.clientX - offset.x, y: e.clientY - offset.y });
        };
        this.elm.onmouseup = function () {
            c_event = new CustomEvent('nodeMoved', { detail: { node: _this,
                    lastPosition: {
                        x: (offset.x - event.clientX) * -1,
                        y: (offset.y - event.clientY) * -1
                    } } });
            document.dispatchEvent(c_event);
            document.onmousemove = null;
            _this.elm.onmouseup = null;
        };
    };
    Node.prototype.addOutputs = function (outputs) {
        for (var i = outputs.length - 1; i >= 0; i--)
            this.outputs.push(new Output(outputs[i].elm, outputs[i].position, outputs[i].name, this));
    };
    Node.prototype.addInputs = function (inputs) {
        for (var i = inputs.length - 1; i >= 0; i--) {
            this.inputs.push(new Input(inputs[i].elm, inputs[i].position, inputs[i].name, this));
        }
    };
    Node.prototype.makeDependencies = function () {
        var _this = this;
        this.nodeDependencies =
            [
                {
                    intervals: [],
                    timeouts: []
                },
                {
                    '$scope': this.$scope,
                    '$timeout': function (func, time) {
                        $timeout(func, time, _this.nodeDependencies[0].timeouts);
                    },
                    '$clearTimeout': function (tId) {
                        $clearTimeout(tId, _this.nodeDependencies[0].timeouts);
                    },
                    '$interval': function (func, time) {
                        $interval(func, time, _this.nodeDependencies[0].intervals);
                    },
                    '$clearInterval': function (iId) {
                        $clearInterval(iId, _this.nodeDependencies[0].intervals);
                    }
                }
            ];
    };
    Node.prototype.makeNode = function () {
    };
    return Node;
})();
"use strict";
var Output = (function () {
    function Output(elm, position, name, parentNode) {
        this.elm = elm;
        this.position = position;
        this.name = name;
        this.parentNode = parentNode;
        elm.onmousedown = this.onMouseDown.bind(this);
        elm.property = this;
        this.connections = [];
        this.value = null;
    }
    Output.prototype.enableConnections = function () {
        this.mapConnections(function (con) {
            con.to.addConnection(con);
            con.show();
        });
    };
    Output.prototype.disableConnections = function () {
        this.mapConnections(function (con) {
            con.to.removeConnection(con);
            con.hide();
        });
    };
    Output.prototype.setValue = function (value) {
        if (this.value != value) {
            this.value = value;
            if (this.connections.length > 0) {
                for (var i = this.connections.length - 1; i >= 0; i--)
                    this.connections[i].to.setValue(value);
            }
        }
    };
    Output.prototype.getValue = function () {
        return (this.value);
    };
    Output.prototype.globalPosition = function () {
        return {
            x: this.position.x + this.parentNode.position.x,
            y: this.position.y + this.parentNode.position.y
        };
    };
    Output.prototype.removeConnection = function (seg) {
        var _this = this;
        this.mapConnections(function (con, index) {
            if (seg == con)
                _this.connections.splice(index, 1);
        });
    };
    Output.prototype.addConnection = function (seg) {
        this.connections.push(seg);
    };
    Output.prototype.mapConnections = function (f) {
        var i;
        for (i = this.connections.length - 1; i >= 0; i--)
            f.call(null, this.connections[i], i);
    };
    Output.prototype.onMouseDown = function (event) {
        var _this = this;
        var c_event;
        if (LABSTATUS !== NORMAL)
            return;
        this.elm.onmouseup = function () {
            _this.elm.onmouseup = null;
            _this.elm.onmousemove = null;
        };
        this.elm.onmousemove = function () {
            _this.elm.onmouseup = null;
            _this.elm.onmousemove = null;
            c_event = new CustomEvent('tryToConnect', { detail: { con: _this, type: 'output' } });
            document.dispatchEvent(c_event);
        };
    };
    return Output;
})();
var TempaleteAPI = (function () {
    function TempaleteAPI(node) {
        this.node = node;
        this.elm = node.elm;
    }
    TempaleteAPI.prototype.onInputValueChange = function (name, f) {
        this.node.mapInputs(function (input) {
            if (input.name === name)
                input.onValueChange = f;
        });
    };
    TempaleteAPI.prototype.setOutputValue = function (name, value) {
        this.node.mapOutputs(function (output) {
            if (output.name === name)
                output.setValue(value);
        });
    };
    TempaleteAPI.prototype.getInputValues = function (name) {
        for (var i = this.node.inputs.length - 1; i >= 0; i--)
            if (this.node.inputs[i].name === name)
                return (this.node.inputs[i].getValues());
        return ([]);
    };
    TempaleteAPI.prototype.inputHasTrue = function (name) {
        var tab;
        tab = this.getInputValues(name);
        for (var i = tab.length - 1; i >= 0; i--) {
            if (tab[i] === true)
                return (true);
        }
        return (false);
    };
    TempaleteAPI.prototype.getOutputValue = function (name) {
        for (var i = this.node.outputs.length - 1; i >= 0; i--)
            if (this.node.outputs[i].name === name)
                return (this.node.outputs[i].getValue());
        return (null);
    };
    return TempaleteAPI;
})();
function loadDisplays(nodes) {
    nodes.lamp = {
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t\t<rect width=\"50\" height=\"50\" rx=\"10\" ry=\"10\"\n\t\t\t\t    style=\"fill:#eee;stroke:#503b5b;stroke-width:5\"></rect>\n\t\t\t\t\t\t<line\n                x1=\"0\"\n                y1=\"25\"\n                x2=\"-10\"\n                y2=\"25\"\n                style=\"stroke:#503b5b;stroke-width:4\"\n                ></line>\n                <circle\n                class=\"controller\"\n                cx=\"25\"\n                cy=\"25\"\n                r=\"13\"\n                style=\"fill:rgba(255,255,255,0.95);stroke:#503b5b;stroke-width:5\">\n                </circle>\n\t\t\t</g>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-a\" cx=\"-15\"\n\t\t\t\tcy=\"25\" r=\"5\"/>\n\t\t\t",
        beforeStart: function () {
            var inputs = [
                {
                    position: { x: -15, y: 25 },
                    name: 'a',
                    elm: this.getElementsByClassName('input-a')[0]
                }
            ];
            return ({ inputs: inputs, outputs: [] });
        },
        afterStart: function () {
            var _this = this;
            this.onInputValueChange('a', function () {
                if (_this.inputHasTrue('a') === true)
                    _this.elm.querySelector(".draggable .controller").style.fill = "rgb(0, 255, 43)";
                else
                    _this.elm.querySelector(".draggable .controller").style.fill = "rgba(255,255,255,0.95)";
            });
        }
    };
    nodes.segments_display = {
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t\t<rect width=\"50\" height=\"90\" rx=\"10\" ry=\"10\"\n\t\t\t\t    style=\"fill:#eee;stroke:#503b5b;stroke-width:5\"></rect>\n\t\t\t\t<line\n                x1=\"0\"\n                y1=\"15\"\n                x2=\"-10\"\n                y2=\"15\"\n                style=\"stroke:#503b5b;stroke-width:4\"\n                ></line>\n                <line\n                x1=\"0\"\n                y1=\"35\"\n                x2=\"-10\"\n                y2=\"35\"\n                style=\"stroke:#503b5b;stroke-width:4\"\n                ></line>\n                <line\n                x1=\"0\"\n                y1=\"55\"\n                x2=\"-10\"\n                y2=\"55\"\n                style=\"stroke:#503b5b;stroke-width:4\"\n                ></line>\n                <line\n                x1=\"0\"\n                y1=\"75\"\n                x2=\"-10\"\n                y2=\"75\"\n                style=\"stroke:#503b5b;stroke-width:4\"\n                ></line>\n                <text class=\"cont\" x=\"12\" y=\"60\" font-family=\"Segment7Standard\"\n                font-size=\"45\" fill=\"#ff1111\">.</text>\n\t\t\t</g>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-a\" cx=\"-15\"\n\t\t\t\tcy=\"15\" r=\"5\"/>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-b\" cx=\"-15\"\n\t\t\t\tcy=\"35\" r=\"5\"/>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-c\" cx=\"-15\"\n\t\t\t\tcy=\"55\" r=\"5\"/>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-d\" cx=\"-15\"\n\t\t\t\tcy=\"75\" r=\"5\"/>\n\t\t\t",
        beforeStart: function () {
            var inputs = [
                {
                    position: { x: -15, y: 15 },
                    name: 'a',
                    elm: this.getElementsByClassName('input-a')[0]
                },
                {
                    position: { x: -15, y: 35 },
                    name: 'b',
                    elm: this.getElementsByClassName('input-b')[0]
                },
                {
                    position: { x: -15, y: 55 },
                    name: 'c',
                    elm: this.getElementsByClassName('input-c')[0]
                },
                {
                    position: { x: -15, y: 75 },
                    name: 'd',
                    elm: this.getElementsByClassName('input-d')[0]
                }
            ];
            return ({ inputs: inputs, outputs: [] });
        },
        afterStart: function () {
            var _this = this;
            this.onInputValueChange('a', function () {
                upDate.call(_this);
            });
            this.onInputValueChange('b', function () {
                upDate.call(_this);
            });
            this.onInputValueChange('c', function () {
                upDate.call(_this);
            });
            this.onInputValueChange('d', function () {
                upDate.call(_this);
            });
            function upDate() {
                var val;
                val = this.inputHasTrue('a') + this.inputHasTrue('b') * 2 +
                    this.inputHasTrue('c') * 4 + this.inputHasTrue('d') * 8;
                if (val < 10)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = val.toString();
                else if (val === 10)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'A';
                else if (val === 11)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'B';
                else if (val === 12)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'C';
                else if (val === 13)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'D';
                else if (val === 14)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'E';
                else if (val === 15)
                    this.elm.getElementsByClassName('cont')[0].innerHTML = 'F';
            }
        }
    };
}
function loadFlipFlops(nodes) {
    nodes.flip_flop_t = {
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t\t<rect width=\"50\" height=\"50\" rx=\"10\" ry=\"10\"\n\t\t\t\t    style=\"fill:#eee;stroke:#216622;stroke-width:5\"></rect>\n\t\t\t\t<line\n                x1=\"0\"\n                y1=\"15\"\n                x2=\"-10\"\n                y2=\"15\"\n                style=\"stroke:#216622;stroke-width:4\"\n                ></line>\n                <text x=\"1\" y=\"24\" font-size=\"25\">></text>\n                <line\n\t\t\t\tx1=\"50\"\n\t\t\t\ty1=\"15\"\n\t\t\t\tx2=\"60\"\n\t\t\t\ty2=\"15\"\n\t\t\t\tstyle=\"stroke:#216622;stroke-width:4\"></line>\n\t\t\t\t<line\n\t\t\t\tx1=\"50\"\n\t\t\t\ty1=\"35\"\n\t\t\t\tx2=\"60\"\n\t\t\t\ty2=\"35\"\n\t\t\t\tstyle=\"stroke:#216622;stroke-width:4\"></line>\n                <text x=\"18\" y=\"30\" font-size=\"20\" >T</text>\n                </circle>\n\t\t\t</g>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-a\" cx=\"-15\"\n\t\t\t\tcy=\"15\" r=\"5\"/>\n\t\t\t<circle connectable=\"output\" class=\"connectable output-a\" cx=\"65\"\n\t\t\t\tcy=\"15\" r=\"5\"/>\n\t\t\t<circle connectable=\"output\" class=\"connectable output-b\" cx=\"65\"\n\t\t\t\tcy=\"35\" r=\"5\"/>\n\t\t\t",
        beforeStart: function () {
            var inputs = [
                {
                    position: { x: -15, y: 15 },
                    name: 'a',
                    elm: this.getElementsByClassName('input-a')[0]
                }
            ];
            var outputs = [
                {
                    position: { x: 65, y: 15 },
                    name: 'a',
                    elm: this.getElementsByClassName('output-a')[0]
                },
                {
                    position: { x: 65, y: 35 },
                    name: 'b',
                    elm: this.getElementsByClassName('output-b')[0]
                }
            ];
            return ({ inputs: inputs, outputs: outputs });
        },
        afterStart: function () {
            var _this = this;
            this.setOutputValue('a', true);
            this.setOutputValue('b', true);
            this.onInputValueChange('a', function () {
                updateOutputs.call(_this);
            });
            function updateOutputs() {
                if (this.inputHasTrue('a')) {
                    var q = this.getOutputValue('a');
                    this.setOutputValue('a', !q);
                    this.setOutputValue('b', q);
                }
            }
            updateOutputs.call(this);
        }
    };
}
'use strict';
function loadTemplate() {
    var nodes;
    nodes = {};
    loadOperators(nodes);
    loadOutputsControls(nodes);
    loadDisplays(nodes);
    loadOther(nodes);
    loadFlipFlops(nodes);
    return (nodes);
}
function loadOther(nodes) {
    nodes.label = {
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t\t<rect class=\"rect-2\" width=\"50\" height=\"50\"\n\t\t\t\t    style=\"fill:rgb(150, 150, 150);stroke:#000;stroke-width:2\"></rect>\n\n\t\t\t</g>\n\t\t\t<g class=\"cont\" style=\"cursor: text\">\n                <rect class=\"label-rect\" x=\"15\" y=\"15\" height=\"20\" width=\"20\"\n                    style=\"fill:#fff\">\n                </rect>\n                <text class=\"label-text\" x=\"17\" y=\"30\" font-size=\"15\" dy=\"0\">\n                </text>\n            </g>\n\n\t\t\t",
        beforeStart: function () {
            return ({ inputs: [], outputs: [] });
        },
        afterStart: function ($scope) {
            var rect = this.elm.querySelector(".label-rect");
            var rect_2 = this.elm.querySelector(".rect-2");
            var text = this.elm.querySelector(".label-text");
            var con = this.elm.querySelector(".cont");
            if (!$scope.txt)
                $scope.txt = 'Label..';
            con.onmousedown = function () {
                $scope.txt = prompt("enter the text for the label:", $scope.txt);
                if ($scope.txt == null)
                    $scope.txt = "Label..";
                update();
            };
            function update() {
                text.innerHTML = $scope.txt;
                rect.setAttribute("width", text.clientWidth + 5);
                rect_2.setAttribute("width", text.clientWidth + 35);
            }
            setTimeout(function () {
                update();
            }, 0);
        }
    };
}
function loadOutputsControls(nodes) {
    nodes.toggle_switch = {
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t\t<rect width=\"50\" height=\"50\" rx=\"10\" ry=\"10\"\n\t\t\t\t    style=\"fill:#eee;stroke:#807777;stroke-width:5\"></rect>\n\t\t\t</g>\n\t\t\t<line\n\t\t\tx1=\"50\"\n\t\t\ty1=\"25\"\n\t\t\tx2=\"60\"\n\t\t\ty2=\"25\"\n\t\t\tstyle=\"stroke:#807777;stroke-width:4\"\n\t\t\t></line>\n\t\t\t<circle\n\t\t\tclass=\"controller\"\n\t\t\tcx=\"25\"\n\t\t\tcy=\"25\"\n\t\t\tr=\"13\"\n\t\t\tstyle=\"fill:rgba(255,255,255,0.95);stroke:#807777;stroke-width:5\">\n\t\t\t</circle>\n\t\t\t<circle connectable=\"output\" class=\"connectable output-a\" cx=\"65\"\n\t\t\t\tcy=\"25\" r=\"5\"/>\n\t\t\t",
        beforeStart: function () {
            var outputs = [
                {
                    position: { x: 65, y: 25 },
                    name: 'a',
                    elm: this.getElementsByClassName('output-a')[0]
                }
            ];
            return ({ inputs: [], outputs: outputs });
        },
        afterStart: function ($scope) {
            var _this = this;
            var con;
            if (!$scope.val)
                $scope.val = false;
            con = this.elm.getElementsByClassName('controller')[0];
            con.onclick = function () {
                $scope.val = !$scope.val;
                upDate.call(_this, $scope.val);
            };
            upDate.call(this, $scope.val);
            function upDate(val) {
                this.setOutputValue('a', val);
                if (val === true)
                    con.style.fill = "rgb(0, 255, 43)";
                else
                    con.style.fill = "rgb(255,43,0)";
            }
        }
    };
    nodes.clock = {
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t\t<rect width=\"50\" height=\"50\" rx=\"10\" ry=\"10\"\n\t\t\t\t    style=\"fill:#eee;stroke:#807777;stroke-width:5\"></rect>\n\t\t\t<line\n\t\t\tx1=\"10\"\n\t\t\ty1=\"22\"\n\t\t\tx2=\"10\"\n\t\t\ty2=\"10\"\n\t\t\tstyle=\"stroke:#000;stroke-width:4\"\n\t\t\t></line>\n\t\t\t<line\n\t\t\tx1=\"8\"\n\t\t\ty1=\"10\"\n\t\t\tx2=\"25\"\n\t\t\ty2=\"10\"\n\t\t\tstyle=\"stroke:#000;stroke-width:4\"\n\t\t\t></line>\n\t\t\t<line\n\t\t\tx1=\"23\"\n\t\t\ty1=\"10\"\n\t\t\tx2=\"23\"\n\t\t\ty2=\"36\"\n\t\t\tstyle=\"stroke:#000;stroke-width:4\"\n\t\t\t></line>\n\t\t\t<line\n\t\t\tx1=\"36\"\n\t\t\ty1=\"36\"\n\t\t\tx2=\"36\"\n\t\t\ty2=\"26\"\n\t\t\tstyle=\"stroke:#000;stroke-width:4\"\n\t\t\t></line>\n\t\t\t<line\n\t\t\tx1=\"38\"\n\t\t\ty1=\"36\"\n\t\t\tx2=\"21\"\n\t\t\ty2=\"36\"\n\t\t\tstyle=\"stroke:#000;stroke-width:4\"\n\t\t\t></line>\n\t\t\t<line\n\t\t\tx1=\"50\"\n\t\t\ty1=\"25\"\n\t\t\tx2=\"60\"\n\t\t\ty2=\"25\"\n\t\t\tstyle=\"stroke:#807777;stroke-width:4\"\n\t\t\t></line>\n\t\t\t</g>\n\n\n\t\t\t<circle connectable=\"output\" class=\"connectable output-a\" cx=\"65\"\n\t\t\t\tcy=\"25\" r=\"5\"/>\n\t\t\t",
        beforeStart: function () {
            var outputs = [
                {
                    position: { x: 65, y: 25 },
                    name: 'a',
                    elm: this.getElementsByClassName('output-a')[0]
                }
            ];
            return ({ inputs: [], outputs: outputs });
        },
        afterStart: function ($interval) {
            var _this = this;
            this.setOutputValue('a', true);
            $interval(function () {
                _this.setOutputValue('a', !_this.getOutputValue('a'));
            }, 200);
        }
    };
    nodes.source_true = {
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t\t<rect width=\"50\" height=\"50\" rx=\"10\" ry=\"10\"\n\t\t\t\t    style=\"fill:#eee;stroke:#807777;stroke-width:5\"></rect>\n\t\t\t<line\n\t\t\tx1=\"15\"\n\t\t\ty1=\"20\"\n\t\t\tx2=\"27\"\n\t\t\ty2=\"13\"\n\t\t\tstyle=\"stroke:#000;stroke-width:4\"\n\t\t\t></line>\n\t\t\t<line\n\t\t\tx1=\"28\"\n\t\t\ty1=\"11\"\n\t\t\tx2=\"28\"\n\t\t\ty2=\"40\"\n\t\t\tstyle=\"stroke:#000;stroke-width:4\"\n\t\t\t></line>\n\t\t\t<line\n\t\t\tx1=\"50\"\n\t\t\ty1=\"25\"\n\t\t\tx2=\"60\"\n\t\t\ty2=\"25\"\n\t\t\tstyle=\"stroke:#807777;stroke-width:4\"\n\t\t\t></line>\n\t\t\t</g>\n\t\t\t<circle connectable=\"output\" class=\"connectable output-a\" cx=\"65\"\n\t\t\t\tcy=\"25\" r=\"5\"/>\n\t\t\t",
        beforeStart: function () {
            var outputs = [
                {
                    position: { x: 65, y: 25 },
                    name: 'a',
                    elm: this.getElementsByClassName('output-a')[0]
                }
            ];
            return ({ inputs: [], outputs: outputs });
        },
        afterStart: function () {
            this.setOutputValue('a', true);
        }
    };
    nodes.source_false = {
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t\t<rect width=\"50\" height=\"50\" rx=\"10\" ry=\"10\"\n\t\t\t\t    style=\"fill:#eee;stroke:#807777;stroke-width:5\"></rect>\n\t\t\t<ellipse cx=\"25\" cy=\"25\" rx=\"12\" ry=\"17\"\n\t\t\tstyle=\"fill: rgba(0,0,0,0);stroke:#000;stroke-width:4\"\n\t\t\t/>\n\t\t\t<line\n\t\t\tx1=\"50\"\n\t\t\ty1=\"25\"\n\t\t\tx2=\"60\"\n\t\t\ty2=\"25\"\n\t\t\tstyle=\"stroke:#807777;stroke-width:4\"\n\t\t\t></line>\n\t\t\t</g>\n\t\t\t<circle connectable=\"output\" class=\"connectable output-a\" cx=\"65\"\n\t\t\t\tcy=\"25\" r=\"5\"/>\n\t\t\t",
        beforeStart: function () {
            var outputs = [
                {
                    position: { x: 65, y: 25 },
                    name: 'a',
                    elm: this.getElementsByClassName('output-a')[0]
                }
            ];
            return ({ inputs: [], outputs: outputs });
        },
        afterStart: function () {
            this.setOutputValue('a', false);
        }
    };
}
'use strict';
function simpleOperators(thum, updateOutput) {
    return ({
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t    " + thum + "\n\t\t\t</g>\n\t\t\t</g>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-a\" cx=\"5\"\n\t\t\t\tcy=\"13\" r=\"5\"/>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-b\"\n\t\t\t\tcx=\"5\" cy=\"39\" r=\"5\"/>\n\t\t\t<circle connectable=\"output\" class=\"connectable output-c\" cx=\"100\"\n\t\t\t\tcy=\"26\" r=\"5\"/>\n\t\t\t",
        beforeStart: function () {
            var inputs = [
                {
                    position: { x: 5, y: 13 },
                    name: 'a',
                    elm: this.getElementsByClassName('input-a')[0]
                },
                {
                    position: { x: 5, y: 39 },
                    name: 'b',
                    elm: this.getElementsByClassName('input-b')[0]
                }
            ];
            var outputs = [
                {
                    position: { x: 100, y: 26 },
                    name: 'c',
                    elm: this.getElementsByClassName('output-c')[0]
                }
            ];
            return ({ inputs: inputs, outputs: outputs });
        },
        afterStart: function () {
            var _this = this;
            this.setOutputValue('c', updateOutput.call(this));
            this.onInputValueChange('a', function () {
                _this.setOutputValue('c', updateOutput.call(_this));
            });
            this.onInputValueChange('b', function () {
                _this.setOutputValue('c', updateOutput.call(_this));
            });
        }
    });
}
function loadOperators(tmpls) {
    var op_nodes;
    var l;
    op_nodes =
        [
            {
                name: 'and',
                thum: '<g transform="translate(-29,-36)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                    'd="M 44.000001,44.094484 C 36.824001,44.094484 25,44.094486 25,44.094486 L 25,18.095913 L 44.000001,18.094485 C 51.176001,18.094485 57.000001,23.918484 57.000001,31.094484 C 57.000001,38.270485 51.176001,44.094484 44.000001,44.094484 z M 57,31.094485 L 66.056394,31.094485 M 16,24.594486 L 25.00006,24.594486 M 16,37.594484 L 25.00006,37.594484"'
                    + 'transform="scale(2,2)"></path>',
                updateOutput: function () {
                    return (this.inputHasTrue('a') && this.inputHasTrue('b'));
                }
            },
            {
                name: 'or',
                thum: '<g transform="translate(-36,-154)" ><path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                    'd="M 25,77.094505 L 25,77.157005 C 27.198731,80.972177 28.46875,85.377717 28.46875,90.094505 C 28.46875,94.811293 27.198731,99.216833 25,103.03202 L 25,103.09452 L 28.46875,103.09452 L 38.46875,103.09452 C 48.079465,103.09452 56.468823,97.855209 60.96875,90.094505 C 56.468824,82.333802 48.079464,77.094506 38.46875,77.094505 L 28.46875,77.094505 L 25,77.094505 z M 60.999719,90.094512 L 70.000279,90.094512 M 18.5,83.594514 L 27.50006,83.594514 M 18.5,96.594512 L 27.50006,96.594512"'
                    + 'transform="scale(2)"></path>',
                updateOutput: function () {
                    return (this.inputHasTrue('a') || this.inputHasTrue('b'));
                }
            },
            {
                name: 'nor',
                thum: '<g transform="translate(-144,-154)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                    'd="M 95,77.094482 L 95,77.156982 C 97.19873,80.972154 98.46875,85.377694 98.46875,90.094482 C 98.46875,94.81127 97.19873,99.21681 95,103.03199 L 95,103.09449 L 98.46875,103.09449 L 108.46875,103.09449 C 118.07946,103.09449 126.46882,97.855186 130.96875,90.094482 C 126.46882,82.333779 118.07946,77.094483 108.46875,77.094482 L 98.46875,77.094482 L 95,77.094482 z M 135,90.094848 C 135,91.198848 134.104,92.094848 133,92.094848 C 131.896,92.094848 131,91.198848 131,90.094848 C 131,88.990848 131.896,88.094848 133,88.094848 C 134.104,88.094848 135,88.990848 135,90.094848 z M 134.99973,90.094481 L 144.00032,90.094481 M 88.5,83.594487 L 97.50006,83.594487 M 88.5,96.594485 L 97.50006,96.594485"'
                    + 'transform="scale(1.7,2)"></path>',
                updateOutput: function () {
                    return (!(this.inputHasTrue('a') || this.inputHasTrue('b')));
                }
            },
            {
                name: 'nand',
                thum: '<g transform="translate(-172,-36)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                    'd="M 114,44.09448 C 106.824,44.09448 95,44.094482 95,44.094482 L 95,18.095909 L 114,18.094481 C 121.176,18.094481 127,23.91848 127,31.09448 C 127,38.270481 121.176,44.09448 114,44.09448 z M 131,31.094482 C 131,32.198482 130.104,33.094482 129,33.094482 C 127.896,33.094482 127,32.198482 127,31.094482 C 127,29.990482 127.896,29.094482 129,29.094482 C 130.104,29.094482 131,29.990482 131,31.094482 z M 130.9997,31.094481 L 135.99976,31.094481 M 87,24.594478 L 95.00006,24.594478 M 87,37.594476 L 95.00006,37.594476"'
                    + 'transform="scale(2)"></path>',
                updateOutput: function () {
                    return (!(this.inputHasTrue('a') && this.inputHasTrue('b')));
                }
            },
            {
                name: 'xor',
                thum: '<g transform="translate(-32,-272)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                    'd="M 30,136.09446 L 30,136.15696 C 32.198731,139.97213 33.46875,144.37767 33.46875,149.09446 C 33.46875,153.81125 32.198731,158.21679 30,162.03196 L 30,162.09446 L 33.46875,162.09446 L 43.46875,162.09446 C 53.079465,162.09446 61.468823,156.85516 65.96875,149.09446 C 61.468824,141.33376 53.079464,136.09446 43.46875,136.09446 L 33.46875,136.09446 L 30,136.09446 z M 25,136.15696 C 27.198731,139.97213 28.46875,144.37767 28.46875,149.09446 C 28.46875,153.81125 27.198731,158.21679 25,162.03196 M 65.999971,149.09448 L 75.000027,149.09448 M 18.5,142.59446 L 27.50006,142.59446 M 18.5,155.59446 L 27.50006,155.59446"'
                    + 'transform="scale(1.8,2)"></path>',
                updateOutput: function () {
                    return ((this.inputHasTrue('a') && !this.inputHasTrue('b'))
                        ||
                            (!this.inputHasTrue('a') && this.inputHasTrue('b')));
                }
            },
            {
                name: 'nxor',
                thum: '<g transform="translate(-149,-272)" > <path style="fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"' +
                    'd="M 100,136.09448 L 100,136.15698 C 102.19873,139.97215 103.46875,144.37769 103.46875,149.09448 C 103.46875,153.81127 102.19873,158.21681 100,162.03198 L 100,162.09448 L 103.46875,162.09448 L 113.46875,162.09448 C 123.07946,162.09448 131.46882,156.85518 135.96875,149.09448 C 131.46882,141.33378 123.07946,136.09448 113.46875,136.09448 L 103.46875,136.09448 L 100,136.09448 z M 95,136.15698 C 97.19873,139.97215 98.46875,144.37769 98.46875,149.09448 C 98.46875,153.81127 97.19873,158.21681 95,162.03198 M 140,149.09521 C 140,150.19921 139.104,151.09521 138,151.09521 C 136.896,151.09521 136,150.19921 136,149.09521 C 136,147.99121 136.896,147.09521 138,147.09521 C 139.104,147.09521 140,147.99121 140,149.09521 z M 140,149.0945 L 149.00006,149.0945 M 88.5,142.59448 L 97.50006,142.59448 M 88.5,155.59448 L 97.50006,155.59448"'
                    + 'transform="scale(1.7,2)"></path>',
                updateOutput: function () {
                    return !((this.inputHasTrue('a') && !this.inputHasTrue('b'))
                        ||
                            (!this.inputHasTrue('a') && this.inputHasTrue('b')));
                }
            },
        ];
    l = op_nodes.length;
    for (var i = 0; i < l; i++)
        tmpls[op_nodes[i].name] = simpleOperators(op_nodes[i].thum, op_nodes[i].updateOutput);
    tmpls.not = {
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t    <g transform=\"translate(-27,-385)\" > <path style=\"fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1\"\n                d=\"M 48.499947,208.09448 C 48.499947,209.19848 47.603947,210.09448 46.499948,210.09448 C 45.395948,210.09448 44.499948,209.19848 44.499948,208.09448 C 44.499948,206.99048 45.395948,206.09448 46.499948,206.09448 C 47.603947,206.09448 48.499947,206.99048 48.499947,208.09448 z M 25,219.09448 L 25,197.09448 L 43.985582,208.09448 L 25,219.09448 z M 48.5,208.09448 L 57.50006,208.09448 M 16,208.09448 L 25.00006,208.09448\"\n                transform=\"scale(2,2)\"></path>\n\t\t\t</g>\n\t\t\t</g>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-a\" cx=\"0\"\n\t\t\t\tcy=\"31\" r=\"5\"/>\n\t\t\t<circle connectable=\"output\" class=\"connectable output-c\" cx=\"90\"\n\t\t\t\tcy=\"31\" r=\"5\"/>\n\t\t\t",
        beforeStart: function () {
            var inputs = [
                {
                    position: { x: 0, y: 31 },
                    name: 'a',
                    elm: this.getElementsByClassName('input-a')[0]
                }
            ];
            var outputs = [
                {
                    position: { x: 90, y: 31 },
                    name: 'c',
                    elm: this.getElementsByClassName('output-c')[0]
                }
            ];
            return ({ inputs: inputs, outputs: outputs });
        },
        afterStart: function () {
            var _this = this;
            this.setOutputValue('c', !this.inputHasTrue('a'));
            this.onInputValueChange('a', function () {
                _this.setOutputValue('c', !_this.inputHasTrue('a'));
            });
        }
    };
    tmpls.tri_state = {
        content: "\n\t\t\t<g class=\"draggable\">\n\t\t\t    <line\n                x1=\"45\"\n                y1=\"-10\"\n                x2=\"45\"\n                y2=\"30\"\n                style=\"stroke:#000;stroke-width:2\"\n\t\t\t    ></line>\n\t\t\t    <g transform=\"translate(-27,-385)\" > <path style=\"fill:beige;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1\"\n                d=\"M 48.499947,208.09448  z M 25,219.09448 L 25,197.09448 L 43.985582,208.09448 L 25,219.09448 z M 43.5,208.09448 L 57.50006,208.09448 M 16,208.09448 L 25.00006,208.09448\"\n                transform=\"scale(2,2)\"></path>\n\t\t\t    </g>\n\t\t\t</g>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-a\" cx=\"0\"\n\t\t\t\tcy=\"31\" r=\"5\"/>\n\t\t\t<circle connectable=\"input\" class=\"connectable input-b\" cx=\"45\"\n\t\t\t\tcy=\"-10\" r=\"5\"/>\n\t\t\t<circle connectable=\"output\" class=\"connectable output-c\" cx=\"90\"\n\t\t\t\tcy=\"31\" r=\"5\"/>\n\t\t\t",
        beforeStart: function () {
            var inputs = [
                {
                    position: { x: 0, y: 31 },
                    name: 'a',
                    elm: this.getElementsByClassName('input-a')[0]
                },
                {
                    position: { x: 45, y: -10 },
                    name: 'b',
                    elm: this.getElementsByClassName('input-b')[0]
                }
            ];
            var outputs = [
                {
                    position: { x: 90, y: 31 },
                    name: 'c',
                    elm: this.getElementsByClassName('output-c')[0]
                }
            ];
            return ({ inputs: inputs, outputs: outputs });
        },
        afterStart: function () {
            var _this = this;
            upDate.call(this);
            this.onInputValueChange('b', function () {
                upDate.call(_this);
            });
            this.onInputValueChange('a', function () {
                upDate.call(_this);
            });
            function upDate() {
                if (this.inputHasTrue('b') === true)
                    this.setOutputValue('c', this.inputHasTrue('a'));
                else
                    this.setOutputValue('c', null);
            }
        }
    };
}
"use strict";
var SandBox = (function () {
    function SandBox(containerId) {
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
    SandBox.prototype.loadNode = function (nodeName) {
        var node;
        var cen;
        node = this.nodesBundler.load(nodeName);
        this.appendNode(node);
        cen = this.svgContainer.getCenter(node);
        node.move({
            x: cen.x - node.elm.getBBox().width / 2,
            y: cen.y - node.elm.getBBox().height / 2
        });
    };
    SandBox.prototype.setStatus = function (s) {
        LABSTATUS = s;
        if (s === ZOOMOUT) {
            this.svgContainer.zoomOut();
            LABSTATUS = NORMAL;
        }
    };
    SandBox.prototype.undo = function () {
        this.historic_manager.undo();
    };
    SandBox.prototype.redo = function () {
        this.historic_manager.redo();
    };
    SandBox.prototype.save = function () {
        var file;
        file = this.saver.save();
        localStorage.setItem('save', file);
    };
    SandBox.prototype.load = function () {
        if (this.saver.open(localStorage.getItem('save')))
            this.historic_manager.clear();
        else {
        }
    };
    SandBox.prototype.download = function () {
        var name;
        var file;
        name = prompt('file name: ', 'logic_gate');
        file = this.saver.save();
        download(file, name + '.txt', 'text/plain');
    };
    SandBox.prototype.upLoad = function (s) {
        var tmp;
        tmp = this.saver.save();
        this.deleteAllNodes();
        if (s && this.saver.open(s))
            this.historic_manager.clear();
        else
            this.saver.open(tmp);
    };
    SandBox.prototype.deleteAllNodes = function () {
        this.svgContainer.elm.innerHTML = '';
        this.nodesBundler.nodesList = [];
    };
    SandBox.prototype.newSheet = function () {
        this.deleteAllNodes();
        this.historic_manager.clear();
        window.location.reload();
    };
    SandBox.prototype.appendNode = function (node) {
        this.svgContainer.appendNode(node.elm);
        this.nodesBundler.pushNode(node);
        this.historic_manager.push({
            undo: { func: this.deleteNode, thisArgc: this, argcs: [null, node] },
            redo: { func: this.appendNode, thisArgc: this, argcs: [node] }
        });
    };
    SandBox.prototype.createConnection = function (from, to, seg) {
        if (seg === void 0) { seg = null; }
        if (!seg)
            seg = new Segment(from, to);
        from.addConnection(seg);
        to.addConnection(seg);
        this.svgContainer.appendLine(seg.elm);
        this.historic_manager.push({
            undo: { func: this.deleteConnection, thisArgc: this, argcs: [null, seg] },
            redo: { func: this.createConnection, thisArgc: this, argcs: [seg.from, seg.to, seg] }
        });
    };
    SandBox.prototype.deleteNode = function (e, node) {
        if (node === void 0) { node = null; }
        if (e)
            node = e.detail.node;
        this.nodesBundler.popNode(node.id);
        this.historic_manager.push({
            undo: { func: this.appendNode, thisArgc: this, argcs: [node] },
            redo: { func: this.deleteNode, thisArgc: this, argcs: [null, node] }
        });
    };
    SandBox.prototype.deleteConnection = function (e, seg) {
        if (seg === void 0) { seg = null; }
        if (e)
            seg = e.detail.segment;
        this.historic_manager.push({
            undo: { func: this.createConnection, thisArgc: this, argcs: [seg.from, seg.to] },
            redo: { func: this.deleteConnection, thisArgc: this, argcs: [null, seg] }
        });
        seg.from.removeConnection(seg);
        seg.to.removeConnection(seg);
        seg.remove();
    };
    SandBox.prototype.onTryToConnect = function (e) {
        var _this = this;
        this.tryToConnectHandler(e).then(function (success) {
            if (success.fromEvent.type === 'output')
                _this.createConnection(success.fromEvent.con, success.toEvent.property);
            else
                _this.createConnection(success.toEvent.property, success.fromEvent.con);
        }, function (error) { });
    };
    SandBox.prototype.tryToConnectHandler = function (event) {
        var tmp_seg = new PreviewSegment(event.detail.con.globalPosition());
        this.svgContainer.appendLine(tmp_seg.elm);
        var promise = new Promise(function (resolve, reject) {
            document.onmousemove = function (e) {
                tmp_seg.upDate({ x: e.offsetX, y: e.offsetY });
            };
            document.onmouseup = function (e) {
                var upElm;
                tmp_seg.remove();
                upElm = document.elementFromPoint(e.pageX, e.pageY);
                document.onmouseup = null;
                document.onmousemove = null;
                if (upElm.property
                    &&
                        (upElm.property instanceof Input || upElm.property instanceof Output)
                    &&
                        upElm.property.constructor.name !== event.detail.con.constructor.name)
                    resolve({ fromEvent: event.detail, toEvent: upElm });
                else
                    reject();
            };
        });
        return (promise);
    };
    SandBox.prototype.onNodeStartMoving = function (e) {
        e.detail.node.mapConnections(function (seg) {
            seg.remove();
        });
        e.detail.node.elm.remove();
        this.svgContainer.appendNode(e.detail.node.elm);
    };
    SandBox.prototype.onNodeMoved = function (e, node) {
        var _this = this;
        if (node === void 0) { node = null; }
        if (e)
            node = e.detail.node;
        node.mapConnections(function (seg) {
            seg.upDate();
            _this.svgContainer.appendLine(seg.elm);
        });
        node.elm.remove();
        this.svgContainer.appendNode(node.elm);
        function undoNodeMoved(node, pos) {
            node.move(pos);
            this.onNodeMoved(null, node);
        }
        this.historic_manager.push({
            undo: { func: undoNodeMoved, thisArgc: this,
                argcs: [node, e ? e.detail.lastPosition : null] },
            redo: { func: undoNodeMoved, thisArgc: this,
                argcs: [node, node.position] }
        });
    };
    return SandBox;
})();
var SVGContainer = (function () {
    function SVGContainer(width, height) {
        var _this = this;
        this.width = width;
        this.height = height;
        this.scale = 1;
        this.elm = document.createElementNS(SVGNS, 'svg');
        this.elm.id = 'svg-container';
        this.elm.setAttribute('width', width.toString());
        this.elm.setAttribute('height', height.toString());
        this.elm.style.position = 'absolute';
        this.lineContainer = document.createElementNS(SVGNS, 'g');
        this.lineContainer.setAttribute("class", "line-container");
        this.nodeContainer = document.createElementNS(SVGNS, 'g');
        this.nodeContainer.setAttribute("class", "node-container");
        this.elm.onmousedown = this.dragAndDropHandler.bind(this);
        setTimeout(function () {
            _this.elm.appendChild(_this.lineContainer);
            _this.elm.appendChild(_this.nodeContainer);
        }, 0);
    }
    SVGContainer.prototype.center = function () {
        this.move({
            x: window.screen.availWidth / 2 - this.width / 2,
            y: window.screen.availHeight / 2 - this.height / 2
        });
    };
    SVGContainer.prototype.zoomOut = function () {
        console.log('todo zoom out');
    };
    SVGContainer.prototype.getCenter = function () {
        return {
            x: window.screen.availWidth / 2 - this.position.x,
            y: window.screen.availHeight / 2 - this.position.y
        };
    };
    SVGContainer.prototype.appendNode = function (elm) {
        this.nodeContainer.appendChild(elm);
    };
    SVGContainer.prototype.appendLine = function (elm) {
        this.lineContainer.appendChild(elm);
    };
    SVGContainer.prototype.move = function (to) {
        this.position = to;
        this.elm.style.left = (to.x / this.scale).toString();
        this.elm.style.top = (to.y / this.scale).toString();
    };
    SVGContainer.prototype.dragAndDropHandler = function (event) {
        var _this = this;
        var offset;
        if (event.srcElement != this.elm)
            return;
        offset = {
            x: event.pageX - this.position.x,
            y: event.pageY - this.position.y
        };
        document.onmousemove = function (e) {
            _this.move({
                x: e.pageX - offset.x,
                y: e.pageY - offset.y
            });
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
    return SVGContainer;
})();
var Saver = (function () {
    function Saver(sandBox) {
        this.sandBox = sandBox;
    }
    Saver.prototype.save = function () {
        this.copy = { svgContainer: {}, nodesBundler: { nodesList: [] } };
        this.saveSVGContainer();
        this.saveNodes();
        return (JSON.stringify(this.copy));
    };
    Saver.prototype.open = function (copy) {
        var _this = this;
        try {
            this.conStack = [];
            this.oCopy = JSON.parse(copy);
            this.createSVGContainer();
            this.createNodes();
            setTimeout(function () {
                _this.createConnections();
            }, 0);
        }
        catch (e) {
            console.error(e);
            return (false);
        }
        return (true);
    };
    Saver.prototype.createConnections = function () {
        for (var cId in this.conStack) {
            var con = this.conStack[cId];
            var from = void 0;
            var to = void 0;
            var f = void 0;
            var t = void 0;
            f = this.sandBox.svgContainer.elm.getElementById(con.uid).property;
            t = this.sandBox.svgContainer.elm.getElementById(con.toUid).property;
            f.mapOutputs(function (output) {
                if (output.name === con.from)
                    from = output;
            });
            t.mapInputs(function (input) {
                if (input.name === con.to)
                    to = input;
            });
            this.sandBox.createConnection(from, to);
        }
    };
    Saver.prototype.createNodes = function () {
        for (var node in this.oCopy.nodesBundler.nodesList)
            this.createNode(this.oCopy.nodesBundler.nodesList[node]);
    };
    Saver.prototype.createNode = function (nodeInfo) {
        var node;
        node = new Node(this.sandBox.nodesBundler.getTemplate(nodeInfo.name), nodeInfo.position, nodeInfo.uid, nodeInfo.name, nodeInfo.$scope);
        this.sandBox.appendNode(node);
        this.conStack = this.conStack.concat(nodeInfo.connections);
    };
    Saver.prototype.createSVGContainer = function () {
        this.sandBox.svgContainer.move(this.oCopy.svgContainer.position);
    };
    Saver.prototype.saveNodes = function () {
        for (var node in this.sandBox.nodesBundler.nodesList)
            this.saveNode(this.sandBox.nodesBundler.nodesList[node]);
    };
    Saver.prototype.saveNode = function (node) {
        var nodeCopy;
        nodeCopy =
            {
                name: node.name,
                position: node.position,
                uid: node.id,
                $scope: node.nodeDependencies[1]['$scope'],
                connections: []
            };
        node.mapOutputs(function (output) {
            output.mapConnections(function (con) {
                var conCopy;
                conCopy = {};
                conCopy.from = con.from.name;
                conCopy.uid = con.from.parentNode.id;
                conCopy.to = con.to.name;
                conCopy.toUid = con.to.parentNode.id;
                nodeCopy.connections.push(conCopy);
            });
        });
        this.copy.nodesBundler.nodesList.push(nodeCopy);
    };
    Saver.prototype.saveSVGContainer = function () {
        this.copy.svgContainer.width = this.sandBox.svgContainer.width;
        this.copy.svgContainer.height = this.sandBox.svgContainer.height;
        this.copy.svgContainer.position = this.sandBox.svgContainer.position;
        this.copy.svgContainer.scale = this.sandBox.svgContainer.scale;
    };
    return Saver;
})();
"use strict";
var PreviewSegment = (function () {
    function PreviewSegment(from) {
        this.from = from;
        this.elm = document.createElementNS(SVGNS, 'line');
        this.elm.setAttributeNS(null, 'style', "stroke:rgb(255,20,20);stroke-width:4");
        this.elm.setAttributeNS(null, 'id', 'preview-segment');
        this.upDate(from);
        this.elm.property = this;
    }
    PreviewSegment.prototype.remove = function () {
        this.elm.remove();
    };
    PreviewSegment.prototype.upDate = function (to) {
        this.to = to;
        this.elm.setAttributeNS(null, 'x1', this.from.x.toString());
        this.elm.setAttributeNS(null, 'y1', this.from.y.toString());
        this.elm.setAttributeNS(null, 'x2', (to.x - 3).toString());
        this.elm.setAttributeNS(null, 'y2', to.y.toString());
    };
    return PreviewSegment;
})();
"use strict";
var Segment = (function () {
    function Segment(from, to) {
        this.from = from;
        this.to = to;
        this._create();
        this.upDate();
        this.elm.property = this;
        this.elm.onmousedown = this.onMouseDown;
    }
    Segment.prototype.hide = function () {
        this.elm.style.visibility = "hidden";
    };
    Segment.prototype.show = function () {
        this.elm.style.visibility = "visible";
    };
    Segment.prototype.remove = function () {
        this.elm.remove();
    };
    Segment.prototype.upDate = function () {
        this._updateLine(this.l1);
        this._updateLine(this.l2);
    };
    Segment.prototype._updateLine = function (line) {
        line.setAttributeNS(null, 'x1', this.from.globalPosition().x.toString());
        line.setAttributeNS(null, 'y1', this.from.globalPosition().y.toString());
        line.setAttributeNS(null, 'x2', this.to.globalPosition().x.toString());
        line.setAttributeNS(null, 'y2', this.to.globalPosition().y.toString());
    };
    Segment.prototype._create = function () {
        this.elm = document.createElementNS(SVGNS, 'g');
        this.l1 = document.createElementNS(SVGNS, 'line');
        this.l2 = document.createElementNS(SVGNS, 'line');
        this.l1.setAttributeNS(null, 'style', "stroke:rgb(0,0,0);stroke-width:5");
        this.l2.setAttributeNS(null, 'style', "stroke:rgb(255,255,255);stroke-width:3");
        this.elm.appendChild(this.l1);
        this.elm.appendChild(this.l2);
        this.elm.setAttributeNS(null, 'id', uid());
    };
    Segment.prototype.onMouseDown = function () {
        if (LABSTATUS === DELETE) {
            var c_event;
            c_event = new CustomEvent('deleteConnection', { detail: { segment: this.property } });
            document.dispatchEvent(c_event);
        }
    };
    return Segment;
})();
//# sourceMappingURL=tsc.js.map
/*
     FILE ARCHIVED ON 16:09:58 Jun 12, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:47:35 Aug 06, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 1930.806 (3)
  esindex: 0.009
  captures_list: 2083.449
  CDXLines.iter: 15.862 (3)
  PetaboxLoader3.datanode: 68.288 (5)
  exclusion.robots: 0.185
  exclusion.robots.policy: 0.174
  RedisCDXSource: 90.95
  PetaboxLoader3.resolve: 3413.384 (4)
  load_resource: 1562.803
*/