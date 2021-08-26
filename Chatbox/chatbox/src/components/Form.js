import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            userLoggedIn: this.props.userLoggedIn,
            setStyle: { display: "none" },
            errorMessage: 'Email or password is wrong'
        };
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
        }
        console.log(this.props.type);
        if (this.props.type == 'login') {
            axios.post('http://localhost:8000/api/auth/login', userData)
                .then(response => {
                    this.setState({
                        userLoggedIn: {
                            username: response.data.user.name,
                            userId: response.data.user._id
                        }
                    })
                    console.log(this.state.userLoggedIn);
                    this.props.login(this.state.userLoggedIn)
                    console.log(this.props.userLoggedIn);
                    this.handlingButtonClick();
                })
                .catch(err => {
                    console.error(err);
                    this.alertMesage();
                });
        }
        else {
            axios.post('http://localhost:8000/api/auth/signup', userData)
                .then(response => {
                    this.setState({
                        userLoggedIn: {
                            username: response.data.user.name,
                            userId: response.data.user._id
                        }
                    })
                    console.log(this.state.userLoggedIn);
                    this.props.login(this.state.userLoggedIn)
                    console.log(this.props.userLoggedIn);
                    this.handlingButtonClick();
                })
                .catch(err => {
                    console.error(err);
                    this.alertMesage();
                });

        }
    }

    handlingButtonClick = () => {
        this.props.history.push({
            pathname: "/chatList",
            state: {
                test: "dddd"
            }
        });
    }

    handleClick = e => {
        if (e.target.name === 'login') {
            this.setState({
                type: "logIn"
            })
        }
        this.setState({
            type: "signUp"
        })
    }

    alertMesage = () => {


        setTimeout(() => {
            this.setState({
                setStyle: {
                    display: "none"
                }
            })
        }, 3000);

    }
    render() {
        return (
            <div>
                <form>
                    <div class="toaster" style={this.state.setStyle}>
                        <div class="alert alert-warning ">
                            <i class="fa fa-check"></i> {this.state.errorMessage}
                        </div>
                    </div>
                    {/* <p>{this.state.userLoggedIn != null ? this.state.userLoggedIn.username : ''}</p> */}
                    {/* Log in form */}
                    {this.props.type === "signup" ?
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="type your username" className="form-control" onChange={this.handleChange} />
                        </div> : null}
                    <div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="type your username" className="form-control" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="***************" className="form-control" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">

                        <input type="submit" name="submit" value={this.props.type === "login" ? "Log in" : "Sign up"} className="btn logIn" onClick={this.handleSubmit} />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.userLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (userLoggedIn) => dispatch({ type: "LOGIN", payload: userLoggedIn }),
        logout: (userLoggedIn) => dispatch({ type: "LOGOUT", payload: userLoggedIn })
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
