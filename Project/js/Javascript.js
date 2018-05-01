"use strict";
var wallet;
var cryptoLijst = [];
var gekochtCryptoLijst = [];

if(localStorage.Wallet.length > 0){
    wallet = JSON.parse(localStorage.Wallet);
}
else {
    wallet = 100000;
}
if (localStorage.gekochtCryptoLijst.length > 0){
    gekochtCryptoLijst = JSON.parse(localStorage.gekochtCryptoLijst);
}

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
        localStorage.gekochtCryptoLijst = JSON.stringify(gekochtCryptoLijst);
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
            localStorage.gekochtCryptoLijst = JSON.stringify(gekochtCryptoLijst);
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