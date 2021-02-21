import React, { Component } from 'react';
import Nav from "../Header/nav";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import { Link } from "react-router-dom";


class Header extends Component {
  render() {
    return (

      <header>
        <Nav />
        <div className="head">
          <h1>Welcome to< br />TradeHub</h1>
          <p>The premiere platform for your trading dreams.</p>
          {/* <p>the public portfolio investment platform to learn, share, and grow</p> */}
        </div>
        <div className="intro">

        </div>
      </header>

    );
  }
}

export default Header;
