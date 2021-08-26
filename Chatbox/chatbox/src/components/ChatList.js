import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";


class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: [],
            user: ''
        }
    }

    //get all user logged in chat list
    componentDidMount = () => {
        axios.get(`http://localhost:8000/api/chat/${this.props.userLoggedIn.userId}`)
            .then(response => {
                this.setState({
                    chatList: response.data.chat
                })
                console.log(response.data.chat);
                console.log(this.state.chatList);
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handlingButtonClick = (id) => {
        this.props.history.push({
            pathname: "/chat",
            state: {
                chatId: id
            }
        });
    }

    handelNewChat = (e) => {
        e.preventDefault();
        this.userExist();
        if (this.state.user != null) {
            axios.post("http://localhost:8000/api/chat/", {
                "users": [
                    { "userId": this.props.userLoggedIn.userId },
                    { "userId": this.state.user._id }
                ]
            })
                .then(response => {
                    console.log(response.data.chat._id);
                    this.handlingButtonClick(response.data.chat._id);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.log("object");
        }

    }

    userExist = () => {
        console.log(this.state.user);
        axios.get(`http://localhost:8000/api/auth/user/${this.state.user}`)
            .then(response => {
                this.setState({
                    user: response.data.user
                })
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div className="ChatList">
                <p>Hi : {this.props.userLoggedIn != null ? this.props.userLoggedIn.username : "null"}</p>
                {/* <p>{this.props.location.state != null ? this.props.location.state.test : "null"}</p> */}

                <div className="card">
                    <div className="newChat">
                        <p>start chating by enter user email</p>
                        <form>
                            <div className="form-group">
                                <input type="email" name="user" placeholder="example@example.com" className="form-control" onChange={this.handleChange} />
                                <input type="button" name="createChat" value="Start chating" className="btn btn-success" onClick={this.handelNewChat} />
                            </div>

                        </form>
                    </div>
                    <div className="list-group">

                        {this.state.chatList.map(chat => {
                            return (
                                <>
                                    <Link to={{
                                        pathname: '/chat',
                                        state: {
                                            chatId: chat._id
                                        }
                                    }} className="list-group-item list-group-item-action">chat id: {chat._id}</Link>
                                </>
                            );
                        })}

                        {/* <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                        <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
                        <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                        <a href="#" class="list-group-item list-group-item-action disabled">Vestibulum at eros</a> */}
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

export default withRouter(connect(mapStateToProps)(ChatList));
