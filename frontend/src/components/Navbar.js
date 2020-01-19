import React, {Component} from 'react';

import Logo from './Logo.png';

import './Navbar.css';

export default class Title extends Component {
    render() {
        return (
            <div className="title-bar">
                    <h1><img src={Logo} alt={"Logo"}/></h1>
            </div>

        ); 
    }
}