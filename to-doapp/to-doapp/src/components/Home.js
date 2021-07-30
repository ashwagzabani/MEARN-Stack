import React, { Component } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { projects: [] }
    }

    componentDidMount() {
        console.log("component did mount")
        this.retrieveProjects();
    }

    retrieveProjects = (event) => {
        axios.get("http://localhost:3001/toDoDB").then(result => {
            if (result.status == 200) {
                this.setState({ projects: result.data })
                console.log(result.data);
            }
        }).catch(error => console.log(error));
    }
    render() {
        return (
            <div className="home">
                <div className="row">
                    <div className="col-md-3">
                        <div className="container">
                            <h3>Projects</h3>
                            <ul>
                            <li><a>project 1</a></li>
                            <li><a>project 2</a></li>
                            <li><a>project 3</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <Dashboard />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
