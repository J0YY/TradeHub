import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li className="logo"><Link add style={{ textDecoration: 'none', color: 'black' }} to='/'>Trade<span>Hub</span></Link></li>
        </ul>
        <ul>
          <li><Link add style={{ textDecoration: 'none', color: 'black' }} to='/portfolio'>Portfolio</Link></li>
          <li><Link add style={{ textDecoration: 'none', color: 'black' }} to='/learn'>Learn</Link></li>
          <li><Link add style={{ textDecoration: 'none', color: 'black' }} to='/share'>Share</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
