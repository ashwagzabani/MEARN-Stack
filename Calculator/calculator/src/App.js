import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataInput: "",
      result: ""
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick = (e) => {
    e.preventDefault();
    let data = this.state.dataInput
    this.setState({
      dataInput: data + e.target.name
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = this.state.dataInput == "" ? 0 : this.state.dataInput;
    let result = this.getResult(data);
    this.setState({
      dataInput: data + ` = ${result}`
    })


  }

  handelReset = () => {
    this.setState({
      dataInput: ""
    })
  }

  getResult(data) {
    return eval(data);
  }
  render() {
    return (
      <div className="App">
        <h1><center>Simple Calculator</center></h1>
        <form>
          <div id="calculator">
            <input type="text" name="value" className="result" value={this.state.dataInput} disabled />
            <button class="clear" type="reset" onClick={this.handelReset}>C</button>

            <button className="span" onClick={this.handleClick} name="7">7</button>
            <button className="span" onClick={this.handleClick} name="8">8</button>
            <button className="span" onClick={this.handleClick} name="9">9</button>
            <button className="span" onClick={this.handleClick} name="+">+</button>

            <button className="span" onClick={this.handleClick} name="4">4</button>
            <button className="span" onClick={this.handleClick} name="5">5</button>
            <button className="span" onClick={this.handleClick} name="6">6</button>
            <button className="span" onClick={this.handleClick} name="-">-</button>

            <button className="span" onClick={this.handleClick} name="1">1</button>
            <button className="span" onClick={this.handleClick} name="2">2</button>
            <button className="span" onClick={this.handleClick} name="3">3</button>
            <button className="span" onClick={this.handleClick} name="/">/</button>

            <button className="span" onClick={this.handleClick} name="0">0</button>
            <button className="span" onClick={this.handleClick} name=".">.</button>
            <button className="span" onClick={this.handleSubmit}>=</button>
            <button className="span" onClick={this.handleClick} name="*">*</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
