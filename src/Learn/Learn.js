import React, { useState, useEffect } from 'react'
import Nav from '../Header/nav'
import SearchIcon from "@material-ui/icons/Search";
import "./Learn.css";
import { db } from "../api/firebase";
import Users from "./Users"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import stockData from "../stocks.json";

function search(stockInfo) {
    let { Symbol, Name } = stockInfo;

}

function SearchBar() {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={stockData}
            getOptionLabel={(option) => option['Name']}
            style={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Stocks" variant="outlined" />}
            placeholder="Search for your favorite stock"
            onChange={(e, v, r) => (r == "select-option") ? search(v) : null}
            autoSelect={true}
            color="black"
            fullWidth={true}
        />
    )
}


function Learn() {

    const [searchStock, setSearchStock] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        db.collection("people").onSnapshot((snapshot) =>
            setUsers(snapshot.docs.map((doc) => doc.data()))
        );
    }, []);

    return (
        <div className="learn">
            <Nav />
            <div className="headline">
                <h1 style={{ marginTop: "12%", marginLeft: "7%", color: "black", fontSize: "55px" }}>Learn</h1>
                <h3 style={{ color: "black", marginLeft: "7%", marginTop: "3%", fontSize: "32px" }}>Today's trades. Click on any to see the details!</h3>
            </div>
            <form>
                <div className="buttons">
                    <button style={{ backgroundColor: "lightgreen", color: "black" }}>BUY</button>
                    <button style={{ color: "black" }}>SELL</button>
                </div>
                <div className="trade">
                    {/* <SearchIcon style={{ fill: "black" }}></SearchIcon>
                    <input placeholder={`Search for your favorite stock`} type="text" value={searchStock} /> */}
                    <SearchBar />
                </div>
            </form>


            <div className="users">
                {users.map((user) => (
                    <Users
                        displayName={user.name}
                        avatar={user.avatar}
                        accountValue={user.accountValue}
                        ticker={user.newestTrade}
                        shares={user.shares}
                        type="buy"
                    />
                ))}
            </div>
        </div>
    )
}

export default Learn
