
import React, { useState, useEffect } from "react";
import StockChart_decrease from "../Assets/Icons/negStock.svg";
import StockChart_increase from "../Assets/Icons/stock2.svg";
import numeral from "numeral";
import { db } from "../api/firebase";
import "../Portfolio/StatsRow.css";
import { useStateValue } from "../StateProvider";

function StatsRow(props) {

  const [{ user }] = useStateValue();



  var p = ((props.price - props.openPrice) / props.openPrice) * 100;
  let percentage;
  if (!isNaN(p)) {
    percentage = p;
    //alert(p);
  }
  else
    percentage = 0.25;

  //check percentage

  //check percentage

  //check percentage

  const completeTransaction = (doc) => {
    let t = (doc.data().cash - props.price).toFixed(2);
    if (t < 0 || isNaN(t)) {
      alert("Sorry, you can't buy " + props.name + " because of insufficient funds.");
      return doc.data().cash;
    }
    alert("1 share of " + props.name + " traded at current market price of $" + props.price + " per share. Your new buying power is $" + doc.data().cash + ", thank you for your transaction at TradeHub!");
    return t;
  }

  const buyStock = () => {
    let sh = 0;
    db.collection("user").doc("temp").collection(user.uid)
      .where("ticker", "==", props.name)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(function (doc) {
            db.collection("user").doc("temp").collection(user.uid)
              .doc(doc.id)
              .update({
                shares: (doc.data().shares += 1),
              });
            sh = doc.data().shares;
          });
        } else {
          db.collection("user").doc("temp").collection(user.uid).add({
            ticker: props.name,
            shares: 1,
          });
        }
      });

    let accValue = 0;
    db.collection("accountValue").doc(user.uid)
      .get()
      .then((doc) => {
        db.collection("accountValue").doc(user.uid)
          .update({
            cash: completeTransaction(doc),
          });
        accValue = doc.data().cash;
      });


    db.collection("people")
      .where("name", "==", user.displayName)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(function (doc) {
            db.collection("people")
              .doc(doc.id)
              .update({
                accountValue: accValue,
                avatar: user.photoURL,
                name: user.displayName,
                newestTrade: props.name,
                shares: sh,
              });
          });
        } else {
          db.collection("people").add({
            accountValue: accValue,
            avatar: user.photoURL,
            name: user.displayName,
            newestTrade: props.name,
            shares: sh,
          });
        }

      });


  };



  var sign = "";
  if (percentage > 0) {
    sign = "+";
  }

  var StockChart = null;
  if (percentage > 0) {
    StockChart = StockChart_increase;
  } else {
    StockChart = StockChart_decrease;
  }

  var price = 0;
  if (props.shares !== undefined) {
    price = props.price * props.shares;
  } else {
    price = props.price;
  }

  var row__percentage = "";
  if (sign === "+") {
    row__percentage = "positive";
  }
  else {
    row__percentage = "negative";
  }
  return (
    <div className="row" onClick={buyStock}>
      <div className="row__intro">
        <h1>{props.name}</h1>
        <p>{props.shares && props.shares + " shares"}</p>
      </div>
      <div className="row__chart">
        <img src={StockChart} height={16} alt="" />
      </div>
      <div className="row__numbers">
        <p className="row__price">${numeral(price).format("0,0.00")}</p>
        <p className={row__percentage}>
          {sign}
          {Number(percentage).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default StatsRow;