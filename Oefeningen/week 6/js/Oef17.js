"use strict";
function bewaar(naam, nummer){
    let persoon = {
        "naam":naam,
        "nummer":nummer
    };
    var text = [];
    if(localStorage.ik != null)
        text = JSON.parse(localStorage.ik);
    text.push(persoon);
    localStorage.ik = JSON.stringify(text);
}