import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from '../cmps/Login.jsx'
import SignUp from '../cmps/SignUp.jsx'
import { connect } from 'react-redux'
import { login, getUser } from '../store/actions/userActions.js'

class Home extends React.Component {


    componentDidMount() {
        this.props.getUser()
            .then(() => {
                if (this.props.loggedUser) this.props.history.push('/board')
            })
    }

    componentDidUpdate() {
        if (this.props.loggedUser) this.props.history.push('/board')
    }

    onDemoClick = () => {
        this.props.login({ username: 'guest', password: 'guest' })
    }

    render() {

        return (
            <div className="home-container">
                <div className="wallpaper" />
                <div className="home-content-wrapper flex">
                    <div className="home-pitch flex column justify-center align-center">
                        {/* <h2 className="logo"></h2> */}
                        <div className="home-description-wrapper">
                            <h3 className="line-a">Taskerr</h3>
                            <h3 className="line-b">Like Trello,</h3>
                            <h3 className="line-c">Just better.</h3>
                            <div className="demo-btn flex align-center justify-center" onClick={this.onDemoClick}>Guest mode</div>
                        </div>
                    </div>
                    <div className="home-login-container flex justify-center align-center">
                        <Switch>
                            <Route component={SignUp} path="/signup" />
                            <Route component={Login} path="/" />
                        </Switch>
                    </div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.user.loggedInUser
    }
}

const mapDispatchToProps = {
    login,
    getUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)