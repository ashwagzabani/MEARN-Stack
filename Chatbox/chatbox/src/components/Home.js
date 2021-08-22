import React, { Component } from 'react';
import logo from '../../src/logo.png';
import { connect } from 'react-redux';
import Form from './Form';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Chat from './Chat';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            userLoggedIn: {}
        };
    }

    render() {
        console.log(this.props.userLoggedIn);
        return (
            <div>
                <Route path="/chat" render={
                    (props) => (
                        <Chat {...props} />
                    )
                } />
                <p>{this.props.userLoggedIn != null ? this.props.userLoggedIn.username : "null"}</p>
                {/* ///#8a5d15, style="background: #019cab"
             // <div class="container">
            //     <h3 class=" text-center">Messaging</h3>
            //     <div class="messaging" >
            //         <div className="row">
            //             <div className="col-md-3">
            //                 <p>messagig list</p>
            //             </div>
            //             <div className="col-md-9">
            //                 <p>chat</p>
            //             </div>
            //         </div>
            //     </div>
            // </div> */}
                <div className="home card">
                    <div className="row">
                        <div className="col-md-6 logoSide">
                            <img src={logo} alt="logo" height="160" />
                        </div>
                        <div className="col-md-6 fromSide card">
                            <div className="options">
                                <Link to="/signup" className="btn signUp" >Sign Up</Link>
                                <Link to="/login" className="btn logIn" >Log In</Link>
                            </div>
                            <Route path="/login" render={
                                (props) => (
                                    <Form type="login" {...props} />
                                )
                            } />
                            <Route path="/signup" render={
                                (props) => (
                                    <Form type="signup" {...props} />
                                )
                            } />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.userLoggedIn
    }
}


export default connect(mapStateToProps)(Home);
