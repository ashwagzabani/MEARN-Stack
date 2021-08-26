import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';


class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: []
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

    render() {
        return (
            <div className="ChatList">
                <p>{this.props.userLoggedIn != null ? this.props.userLoggedIn.username : "null"}</p>

                <div className="card">
                    <div className="list-group">

                        {this.state.chatList.map(chat => {
                            return (
                                <>
                                    <Link to={{
                                        pathname: '/chat',
                                        state: {
                                            chatId: chat._id
                                        }
                                    }} className="list-group-item list-group-item-action">wwwwwwwww</Link>
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

export default connect(mapStateToProps)(ChatList);
