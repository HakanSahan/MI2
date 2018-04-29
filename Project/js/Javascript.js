"use strict";
var wallet = 100000;
var request = new XMLHttpRequest();
request.open('GET','https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=50');
request.onload = function () {
    console.log("You did it");
    var crypto = JSON.parse(request.responseText);
    for(var i =0; i <= 49; i++){
        cryptoLijst.push(crypto[i]);
    }
    console.log("You did it again");
};
request.send();

var cryptoLijst = [];
var gekochtCryptoLijst = [];

function KoopCyrpto(aantal , cryptoKopen)
{
    var amount = cryptoKopen.price_eur * aantal;
    if (wallet >= amount) {
        var index = FindIndex(gekochtCryptoLijst, cryptoKopen.id);
        if (index !== -1) {
            gekochtCryptoLijst[index].aantal += aantal;
        }
        else {
            gekochtCryptoLijst.push({aantal: aantal, id: cryptoKopen.id});
        }
        wallet -= cryptoKopen.price_eur * aantal;
    }
    else {
        console.log("Not enough funds");
    }
}
function VerkoopCrypto(aantal, cryptoVerkopen){
    var index = FindIndex(gekochtCryptoLijst, cryptoVerkopen.id);
    if (index !== -1) {
        if (gekochtCryptoLijst[index].aantal >= aantal){
            var index2 = FindIndex(cryptoLijst, cryptoVerkopen.id);
            wallet += cryptoLijst[index2].price_eur * aantal;
            gekochtCryptoLijst[index].aantal = (gekochtCryptoLijst[index].aantal - aantal);
            if(gekochtCryptoLijst[index].aantal < 1){
                gekochtCryptoLijst.splice(index,1);
            }
        }
        else {
            console.log("Not enough crypto");
            return;
        }
    }
    else {
        console.log("You do not own that crypto")
    }
}

function ShowGekochtCrypto() {
    var i;
    for  (i = 0; i < gekochtCryptoLijst.length;i++){
    console.log(gekochtCryptoLijst[i].id + " " +  gekochtCryptoLijst[i].aantal);
    }
}
function FindIndex(array, name){
    var i;
    for  (i = 0; i < array.length;i++){
        if (array[i].id === name){
            return i;
        }
    }
    return -1;
}
$("div").html("HEY");