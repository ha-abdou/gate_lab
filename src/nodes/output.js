"use strict";
"use strict";
var Output = (function () {
    function Output(elm, position) {
        this.elm = elm;
        this.position = position;
        elm.onmousedown = this.onMouseDown;
        elm.property = this;
    }
    Output.prototype.onMouseDown = function (event) {
        var _this = this;
        var c_event;
        this.elm.onmouseup = function () {
            _this.elm.onmouseup = null;
            _this.elm.onmousemove = null;
        };
        this.elm.onmousemove = function () {
            _this.elm.onmouseup = null;
            _this.elm.onmousemove = null;
            c_event = new CustomEvent('tryToConnect', { detail: { 'output': _this } });
            document.dispatchEvent(c_event);
        };
    };
    return Output;
})();
