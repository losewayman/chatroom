import React, { Component } from 'react';
import App from './App';
import Login from './Login';
import { BrowserRouter as Router, Route } from "react-router-dom";


class Routes extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    render() {
        return (
            <Router>   
            <div>
              <Route exact path="/" component={App} />
              <Route path="/login" component={Login} /> 
            </div> 
            </Router>
        );
    }
}


export default Routes;