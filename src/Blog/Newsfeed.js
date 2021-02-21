import React, { useState, useEffect } from "react";
import "../Blog/Newsfeed.css";
import LineGraph from "../Stock/LineGraph";
import TimeLine from '../Stock/TimeLine'
import { db } from "../api/firebase";
import { useStateValue } from "../StateProvider";

function Newsfeed() {

  const [seed, setSeed] = useState("");
  const [{ user }] = useStateValue();
  const [buyingPwr, setBuyingPwr] = useState("");


  db.collection("accountValue").doc(user.uid).get()
    .then((snapshot) => {
      setBuyingPwr(snapshot.data().cash);
    })
    .catch((error) => {
      alert(error);
    })



  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="newsfeed">
      <div className="newsfeed__container">
        <div className="newsfeed__chart__section">
          <div className="newsfeed_price_asset">
            <h1> ${(Math.floor(Math.random() * 150000)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h1>
            <p> $178.22 (+0.12) Today </p>
          </div>
          <div className="newsfeed__chart">
            <LineGraph />
            <TimeLine />
          </div>
        </div>
        <div className="newsfeed__buying__section">
          <h2> Buying Power</h2>
          <h2>${buyingPwr.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h2>
        </div>
        <div className="newsfeed__market__section">
          <div className="newsfeed__market__box">
            <p> Markets Closed</p>
            <h1> NOTE: Please don't buy too many stocks at a time! The Finnhub API's free plan only allows a few requests at a time, otherwise the app will crash :(</h1>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Newsfeed;
