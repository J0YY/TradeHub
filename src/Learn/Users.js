import "./Users.scss"
import Divider from "../Home/Divider"
import TradeIndicator from "../Home/PublicTrade/TradeIndicator";
import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import LineGraph from "../Stock/LineGraph";
import TimeLine from "../Stock/TimeLine"

function Users({ avatar, displayName, accountValue, ticker, shares, type }) {

    function NavItem(props) {
        const [open, setOpen] = useState(false);
        return (
            <li className="nav-item">
                <div className="icon-button" onClick={() => setOpen(!open)}>{props.icon}</div>
                { open && props.children}
            </li >
        )
    }

    function DropdownMenu() {
        function DropdownItem(props) {
            return (
                <div className="menu-item">
                    {props.children}
                </div>
            )
        }
        return (
            <div className="dropdown">
                <Avatar src={avatar} />
                <h1>{displayName}</h1>
                <h2>Account value: {accountValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h2>
                <h2>Most recent trade: {ticker}, {shares.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}, {type}</h2>
                <div className="newsfeed__chart">
                    <LineGraph />
                    <TimeLine />
                </div>
            </div>
        )
    }



    ticker = ticker.toUpperCase();
    type = type.toLowerCase();
    let [sharesInt, sharesFloat] = shares.toString().split(".")
    //when adding commas, we start from the end -> reverse string
    //reverse string to get original
    sharesInt = sharesInt.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    shares = sharesInt + " Shares";
    accountValue = "$" + accountValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return (
        <div className="public-trade-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <NavItem icon={<Avatar style={{ width: "3.5em", height: "3.5em", borderRadius: "50%" }} src={avatar} />}><DropdownMenu></DropdownMenu></NavItem>

                {/* <div style={{ width: "3.5em", height: "3.5em", borderRadius: "50%", backgroundColor: "cornflowerblue" }} /> */}
                <div style={{ paddingLeft: "0.8em", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", opacity: 0.7 }}>
                    <p style={{ fontSize: "1.2em", paddingBottom: "0.4em" }}>{displayName}</p>
                    <p style={{ fontSize: "1.2em", }}>{accountValue}</p>
                </div>

            </div>
            <div className="trade-info">
                <div style={{ marginRight: "1.2em" }} className="share-info">
                    <p className="asset-title">{ticker}</p>
                    <p className="num-shares">{shares}</p>
                </div>
                <Divider />
                <TradeIndicator style={{ marginLeft: "1.2em" }} type={type} />
            </div>
        </div>
    )
}

export default Users