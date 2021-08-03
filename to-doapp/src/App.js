import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import { connect } from 'react-redux';
import { Component } from 'react';
import DailyToDo from './components/DailyToDo';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ""
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1>Daily To Do List</h1>
            </div>
            <div className="card-body">
              <ul className="list-group task-list">
                <DailyToDo handleDeleteClick={this.props.handleDeleteClick} handleDoneClick={this.props.handleDoneClick} />
              </ul>
            </div>
            <div className="card-footer">
              <div className="form-group">
                <input type="text" className="form-control" name="task" placeholder="Add new task" onChange={this.handleChange} />
                <input type="button" className="btn btn-success" value="Add" name="task" onClick={() => this.props.push(this.state.task)} />
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
    toDoDB: state.toDoDB
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (task) => dispatch({ type: "PUSH", payload: task }),
    handleDeleteClick: (taskId) => dispatch({ type: "DELETE", payload: taskId }),
    handleDoneClick: (taskId) => dispatch({ type: "DONE", payload: taskId })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
