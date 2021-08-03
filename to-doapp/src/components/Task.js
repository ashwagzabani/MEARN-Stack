import React, { Component } from 'react';
import { connect } from 'react-redux';

class Task extends Component {
    render() {
        console.log(this.props.taskDetails);
        return (
            <div>
                <li className="list-group-item list-group-item-action" id="task">
                    <span className={"list-item ", this.props.taskDetails.isFinish ? " task" : " "}>
                        {this.props.taskDetails.task}
                    </span>
                    <span className="control-icons" id="control-icons">
                        <i class="fa fa-check" onClick={() => this.props.handleDoneClick(this.props.taskDetails.taskId)}> </i>
                        <i class="fa fa-trash" onClick={() => this.props.handleDeleteClick(this.props.taskDetails.taskId)}></i>
                    </span>
                </li>
            </div>
        );
    }
}

export default connect()(Task);
