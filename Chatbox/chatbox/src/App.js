import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import './App.css';
import Home from './components/User'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Chat from './components/Chat';
import LandingPage from './components/LandingPage';
import ChatList from './components/ChatList';

class App extends Component {
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
      console.log(this.state.messages);

    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    this.socket.emit('SEND_MESSAGE', {
      author: this.state.username,
      message: this.state.message
    });

    this.setState({ message: '' });
    console.log(this.state.username);
  };

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route path="/user" component={Home} />
          <Route path="/chatList" render={
            (props) => (
              <ChatList {...props} />
            )} />
          <Route path="/chat" render={
            (props) => (
              <Chat {...props} />
            )} />
        </div>
        {/* // <div>
      //   <ul>
      //     {this.state.messages.map(item => {
      //       return (
      //         <li>
      //           {item.author} : {item.message}
      //         </li>
      //       );
      //     })}
      //   </ul>
      //   <lable>username</lable>
      //   <input
      //     type="text"
      //     name="username"
      //     value={this.state.username}
      //     onChange={this.handleChange}
      //   />

      //   <lable>message</lable>
      //   <input
      //     type="text"
      //     name="message"
      //     value={this.state.message}
      //     onChange={this.handleChange}
      //   />

      //   <button onClick={this.handleSubmit}>Send</button>
      // </div> */}
      </Router>
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
