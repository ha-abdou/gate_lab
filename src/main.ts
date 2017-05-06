/**
 * Created by abdou on 24/03/17.
 */
"use strict";

function main() {
    lab = new GLab("lab-svg");

    set_edit(lab.setStatus, NORMAL);
    if (!localStorage.getItem('save'))
    {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                localStorage.setItem('save', this.responseText);
                lab.load();
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
