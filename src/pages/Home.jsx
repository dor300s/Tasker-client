import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from '../cmps/Login.jsx'
import SignUp from '../cmps/SignUp.jsx'
import { connect } from 'react-redux'
import { login } from '../store/actions/userActions.js'

class Home extends React.Component {


    componentDidMount() {
        // if (this.props.loggedUser) this.props.history.push('/board')
    }

    componentDidUpdate() {
        // if (this.props.loggedUser) this.props.history.push('/board')
    }

    onDemoClick = () => {
        this.props.login({ username: 'guest', password: 'guest' })
    }

    render() {

        return (
            <div className="home-container">
                <div className="home-content-wrapper flex">
                    <div className="home-pitch flex column justify-center align-center">
                        <h1 className="logo">LOGO</h1>
                        <h1>Taskerr lets you organize <br /> and track group tasks - Easy.</h1>
                        <h2>TaksHub’s tools
                        boards , lists , cards <br />
                        Improves and simplify the way you manage your projects.
                        </h2>
                        <div className="demo-btn flex align-center justify-center">
                            <div onClick={this.onDemoClick}>Try Our Demo!</div>
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
        // return (
        //     <div className="waveWrapper waveAnimation">
        //         <div className="waveWrapperInner bgTop">
        //             <div className="wave waveTop" ></div>
        //         </div>
        //         <div className="waveWrapperInner bgMiddle">
        //             <div className="wave waveMiddle" ></div>
        //         </div>
        //         <div className="waveWrapperInner bgBottom">
        //             <div className="wave waveBottom" ></div>
        //         </div>
        //     </div>
        // )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.user.loggedInUser
    }
}

const mapDispatchToProps = {
    login
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)