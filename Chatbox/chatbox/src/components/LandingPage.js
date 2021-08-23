import React, { Component } from 'react';
import logo from '../../src/logo.png';
import User from './User';
import '../App.css';


class LandingPage extends Component {
    render() {
        return (
            <div className="home card">
                <div className="row">
                    <div className="col-md-6 logoSide">
                        <img src={logo} alt="logo" height="160" />
                    </div>
                    <div className="col-md-6">
                        <center>
                            <br />
                            <h2>WELCOME TO CHATBOX</h2>
                            <br />
                            <br />
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <br />

                        </center>
                        <User />
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;
