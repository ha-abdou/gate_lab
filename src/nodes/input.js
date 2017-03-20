"use strict";
var Input = (function () {
    function Input(elm, position) {
        this.elm = elm;
        this.position = position;
        elm.onmousedown = this.onMouseDown;
        elm.property = this;
    }
    Input.prototype.onMouseDown = function (event) {
        var _this = this;
        var c_event;
        this.elm.onmouseup = function () {
            _this.elm.onmouseup = null;
            _this.elm.onmousemove = null;
        };
        this.elm.onmousemove = function () {
            _this.elm.onmouseup = null;
            _this.elm.onmousemove = null;
            c_event = new CustomEvent('tryToConnect', { detail: { 'input': _this } });
            document.dispatchEvent(c_event);
        };
    };
    return Input;
})();
