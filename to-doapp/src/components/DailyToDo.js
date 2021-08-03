import React, { Component } from 'react';
import { connect } from 'react-redux';
import Task from './Task';
class DailyToDo extends Component {

    render() {
        const tasks = this.props.toDoDB.map((task, index) => {
            console.log(task);
            return (
                <Task taskDetails={task} index={index}
                    handleDeleteClick={this.props.handleDeleteClick}
                    handleDoneClick={this.props.handleDoneClick} />
            );
        })
        return (
            <div>
                {tasks}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toDoDB: state.toDoDB
    }
}




export default connect(mapStateToProps)(DailyToDo);
