import React from 'react';
import { Link } from "gatsby"

import '../styles/NavBar.scss';

const NavBar = () => {
    return <div className="nav-bar">
        <Link to="/wedding/">THE WEDDING</Link>
        <div>HOTELS</div>
        <div>REGISTRY</div>
        <div>RSVP</div>
        <div>CONTACT US</div>
    </div>
}

export default NavBar;