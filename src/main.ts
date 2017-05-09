/**
 * Created by abdou on 24/03/17.
 */
"use strict";

window.lab = {};

function main() {
    lab = new SandBox("lab-svg");

    set_edit(lab.setStatus, NORMAL);
    if (!localStorage.getItem('save'))
    {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                localStorage.setItem('save', this.responseText);
                lab.load();
                window.location.reload();
            }
        };
        xhttp.open("GET", "examples/1.txt", true);
        xhttp.send();
    }
    else
        lab.load();

    window.onbeforeunload = () =>{
        lab.save();
        return null;
    };
}

if (location.protocol != 'file:' && location.protocol != 'https:')
{
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}
var _edit = document.querySelector("#edit-elm a");
var _delete = document.querySelector("#delete-elm a");
var _more_menu = document.getElementsByClassName("more-panel")[0];
var _before_more_menu = document.getElementsByClassName("before-panel")[0];
var _file_input = document.getElementById("file-input");

function set_edit (f: any, s: any)
{
    _set(_edit);
    _unset(_delete);
    f(s);
}
function set_delete (f: any, s: any)
{
    _set(_delete);
    _unset(_edit);
    f(s);
}
function _set(node: any)
{
    node.style.background = "rgb(68, 70, 122)";
    node.style.color = "white";
}
function _unset(node: any)
{
    node.style.background = "white";
    node.style.color = "rgb(68, 70, 122)";
}

function show_more_menu()
{
    _before_more_menu.style.display = 'block';
    _more_menu.style.display = 'block';
}
function close_more_menu()
{
    _before_more_menu.style.display = 'none';
    _more_menu.style.display = 'none';
}

function upload ()
{
    if (_file_input.value == "")
    {
        alert("please select file");
        return;
    }
    let reader = new FileReader();

    reader.onload = function(){
        localStorage.setItem('save', reader.result);
        window.onbeforeunload = null;
        window.location.reload();
    };
    reader.readAsText(_file_input.files[0]);
}
