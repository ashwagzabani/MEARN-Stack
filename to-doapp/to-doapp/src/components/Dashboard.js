import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { toDoList: [], inProgressList: [], doneList: [] }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 card">
                        <div className="card-header">
                            <h3>To Do</h3>
                        </div>
                        <div className="card-body">
                            <ul class="list-group">
                                <li class="list-group-item">Cras justo odio</li>
                                <li class="list-group-item">Dapibus ac facilisis in</li>
                                <li class="list-group-item">Morbi leo risus</li>
                                <li class="list-group-item">Porta ac consectetur ac</li>
                                <li class="list-group-item">Vestibulum at eros</li>
                            </ul>                        </div>
                    </div>
                    <div className="col-md-4 card">
                        <div className="card-header">
                            <h3>In Progress</h3>
                        </div>
                        <div className="card-body">
                            <ul class="list-group">
                                <li class="list-group-item">Cras justo odio</li>
                                <li class="list-group-item">Dapibus ac facilisis in</li>
                                <li class="list-group-item">Morbi leo risus</li>
                                <li class="list-group-item">Porta ac consectetur ac</li>
                                <li class="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4 card">
                        <div className="card-header">
                            <h3>Done</h3>
                        </div>
                        <div className="card-body">
                            <ul class="list-group">
                                <li class="list-group-item">Cras justo odio</li>
                                <li class="list-group-item">Dapibus ac facilisis in</li>
                                <li class="list-group-item">Morbi leo risus</li>
                                <li class="list-group-item">Porta ac consectetur ac</li>
                                <li class="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
