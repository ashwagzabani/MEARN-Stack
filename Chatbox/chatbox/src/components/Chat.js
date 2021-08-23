import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: [],
            userLoggedIn: null
        };

        this.socket = io('localhost:8000');

        this.socket.on('RECEIVE_MESSAGE', data => {
            this.setState({
                messages: [...this.state.messages, data]
            });
            // console.log(this.state.messages);

        });

    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = () => {
        this.socket.emit('SEND_MESSAGE', {
            author: this.props.userLoggedIn.username, //this.state.username
            message: this.state.message
        });
    }
    render() {
        return (
            <div>
                {/* <p>{this.props.userLoggedIn}</p> */}
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
                                            {item.author} : {item.message}
                                        </li>
                                    );
                                })}
                            </ul>
                            <lable>username</lable>
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
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
