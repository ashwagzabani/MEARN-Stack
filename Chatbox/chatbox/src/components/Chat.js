import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [],
            userLoggedIn: null,
            userDetails_2: {}
        };

        this.socket = io('localhost:8000');


        this.socket.on('RECEIVE_MESSAGE', data => {
            this.setState({
                messages: data.messages
            });
        });

    }

    componentDidMount = () => {
        this.socket.emit('CONNECTED', { id: "612425a73cb9b62de4e0132c" })
        this.socket.on('Old_MESSAGES', data => {
            this.setState({
                messages: data.messages
            });
            console.log("connected");
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = () => {
        this.socket.emit('SEND_MESSAGE', {
            id: "612425a73cb9b62de4e0132c",
            messages: {
                userId: this.props.userLoggedIn.userId, //this.state.username
                username: this.props.userLoggedIn.username, //this.state.username
                content: this.state.message
            }
        });
    }

    getUserDetails = (userId) => {
        axios.patch(`http://localhost:8000/api/user/${userId}`)
            .then(response => {
                this.setState({
                    userDetails_2: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <p>{this.props.userLoggedIn != null ? this.props.userLoggedIn.username : "null"}</p>
                <div className="row">
                    <div className="col-md-4">
                        <h2>Chat list</h2>
                    </div>
                    <div className="col-md-8">
                        <h2>Chat</h2>
                        <div>
                            <ul>
                                {this.state.messages.map(item => {
                                    return (
                                        <li>
                                            {item.userId} : {item.content}
                                        </li>
                                    );
                                })}
                            </ul>
                            <lable>message</lable>
                            <input
                                type="text"
                                name="message"
                                value={this.state.message}
                                onChange={this.handleChange}
                            />

                            <button onClick={this.handleSubmit}>Send</button>
                            <div>
                            </div>

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

export default connect(mapStateToProps)(Chat);
