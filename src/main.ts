/**
 * Created by abdou on 24/03/17.
 */
"use strict";

function main() {
    lab = new GLab("lab-svg");


    set_edit(lab.setStatus, NORMAL);
    lab.load();
    window.onbeforeunload = () =>{
        lab.save();
        return null;
    };
//  lab.loadNode("tri_state");
//	lab.loadNode("source");
//    lab.loadNode("display");
}
