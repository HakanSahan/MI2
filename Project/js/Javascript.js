"use strict";
var wallet;
var cryptoList = [];
var ownedCryptoList = [];

if(localStorage.Wallet){
    wallet = JSON.parse(localStorage.Wallet);
}
else {
    wallet = 100000;
}
if (localStorage.ownedCryptoList){
    ownedCryptoList = JSON.parse(localStorage.ownedCryptoList);
}

function BuyCyrpto(amount , cryptoBuy)
{
    if(amount !== 0 && amount) {
        var worth = cryptoBuy.price_eur * amount;
        if (wallet >= worth) {
            var index = FindIndex(ownedCryptoList, cryptoBuy.id);
            if (index !== -1) {
                ownedCryptoList[index].amount += amount;
            }
            else {
                ownedCryptoList.push({amount: amount, id: cryptoBuy.id, price: cryptoBuy.price_eur});
            }
            wallet -= worth;
            localStorage.ownedCryptoList = JSON.stringify(ownedCryptoList);
        }
        else {
            return "Not enough funds";
        }
    }
    else {
        return "Amount cannot be empty or less than 1";
    }
}
function SellCrypto(amount, cryptoSell){
    if(amount !== 0 && amount){
    var index = FindIndex(ownedCryptoList, cryptoSell.id);
    if (index !== -1) {
        if (ownedCryptoList[index].amount >= amount){
            var index2 = FindIndex(cryptoList, cryptoSell.id);
            wallet += cryptoList[index2].price_eur * amount;
            ownedCryptoList[index].amount = (ownedCryptoList[index].amount - amount);
            if(ownedCryptoList[index].amount < 1){
                ownedCryptoList.splice(index,1);
            }
            localStorage.ownedCryptoList = JSON.stringify(ownedCryptoList);
        }
        else {
            return "Not enough crypto";
        }
    }
    else {
        return "You do not own that crypto";
    }
    }
    else {
        return "Amount cannot be empty or 0";
    }
}

function ShowOwnedCrypto() {
    var i;
    for  (i = 0; i < ownedCryptoList.length;i++){
    console.log(ownedCryptoList[i].id + " " +  ownedCryptoList[i].amount);
    }
}
function CalculateProfit(crypto){
  var index = FindIndex(cryptoList,crypto.id);
  return (cryptoList[index].price_eur - crypto.price)/crypto.price;
}
function CalculateTotalWorth() {
  var totalWorth = wallet;
  for (var i = 0; i < ownedCryptoList.length;i++){
    var index = FindIndex(cryptoList,ownedCryptoList[i].id);
    if (index !== -1){
    totalWorth += ownedCryptoList[i].amount * cryptoList[index].price_eur;
    }
  }
  return totalWorth;
}
function CalculateTotalProfit() {
  return ((CalculateTotalWorth() - 100000)/100000)*100;
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
