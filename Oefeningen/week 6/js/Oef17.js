"use strict";
function bewaar(naam, bday){
    var persoon = {
        "naam":naam,
        "bday":new Date(bday)
    };
    var text = [];
    if(localStorage.ik.length  > 0 )
        text = JSON.parse(localStorage.ik);
    text.push(persoon);
    localStorage.ik = JSON.stringify(text);
}