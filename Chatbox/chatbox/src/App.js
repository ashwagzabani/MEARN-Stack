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
