"use strict";
/** class GekochtCrypto {
    naam;
    aantal;
    constructor(naam, aantal, aankooprpijs){
        this.aantal = aantal
        this.naam = naam;
    }
}

class cyrpto {
    naam;
    prijs;
    constructor(naam,prijs){
        this.naam = naam;
        this.prijs = prijs;
    }
}
 **/
var wallet = 100000;
var BTC = {price: 10, name: "BTC"};
var ABC = {price: 100, name: "ABC"};
var CBA = {price: 5, name: "CBA"};
var BAC = {price: 150, name: "BAC"};
var CYC = {price: 200, name: "CYC"};

// var crypto = [BTC,ABC,CBA,BAC,CYC];
var gekochtCryptoLijst = [];

function KoopCyrpto(aantal , cryptoKopen)
{
    var amount = cryptoKopen.price *aantal;
    if (wallet >= amount) {
        var index = FindIndex(gekochtCryptoLijst, cryptoKopen.name);
        if (index !== -1) {
            gekochtCryptoLijst[index].aantal += aantal;
        }
        else {
            gekochtCryptoLijst.push({aantal: aantal, name: cryptoKopen.name});
        }
        wallet -= cryptoKopen.price * aantal;
    }
    else {
        console.log("Not enough funds");
    }
}
function VerkoopCrypto(aantal, cryptoVerkopen){
    var index = FindIndex(gekochtCryptoLijst, cryptoVerkopen.name);
    if (index !== -1) {
        if (gekochtCryptoLijst[index].aantal >= aantal){
            wallet += cryptoVerkopen.price * aantal;
            gekochtCryptoLijst[index].aantal = gekochtCryptoLijst[index].aantal - aantal;
            if(gekochtCryptoLijst[index].aantal === 0){
                gekochtCryptoLijst = gekochtCryptoLijst.splice(index,1);
            }
        }
        else {
            console.log("Not enough crypto")
        }

    }
    else {
        console.log("You do not own that crypto")
    }
}

function ShowGekochtCrypto() {
    var i;
    for  (i = 0; i < gekochtCryptoLijst.length;i++){
    console.log(gekochtCryptoLijst[i].name + " " +  gekochtCryptoLijst[i].aantal);
    }
}
function FindIndex(array, name){
    var i;
    for  (i = 0; i < gekochtCryptoLijst.length;i++){
        if (array[i].name === name){
            return i;
        }
    }
    return -1;
}
