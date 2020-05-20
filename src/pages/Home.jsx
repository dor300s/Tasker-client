import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from '../cmps/Login.jsx'
import SignUp from '../cmps/SignUp.jsx'


export default class Home extends React.Component {


    render() {

        return (
            <div>
                <h1>This is Home</h1>
                <Link to="/board">Try Our Demo!</Link>
                <Switch>
                    <Route component={SignUp} path="/signup" />
                    <Route component={Login} path="/" />
                </Switch>
            </div>
        )
    }
}