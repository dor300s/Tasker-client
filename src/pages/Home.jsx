import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from '../cmps/Login.jsx'
import SignUp from '../cmps/SignUp.jsx'
import { connect } from 'react-redux'
class Home extends React.Component {

    componentDidMount(){
        console.log('Home mounted');
        
        if(this.props.loggedUser) this.props.history.push('/board')
    }


    render() {

        return (
            <div className="home-container">
                <h1>LOGO</h1>
                <div className="home-content-wrapper flex">
                    <div className="home-pitch flex column justify-center align-center">
                        <h1>Taskerr lets you organize <br /> and track group tasks - Easy.</h1>
                        <h2>TaksHub’s tools
                        boards , lists , cards <br />
                        Improves and simplify the way you manage your projects.
                        </h2>
                        <button>Try Live Demo</button>
                    </div>
                    <div className="home-login-container flex justify-center align-center">
                        <Switch>
                            <Route component={SignUp} path="/signup" />
                            <Route component={Login} path="/" />
                        </Switch>
                    </div>
                </div>
                {/* <Link to="/board">Try Our Demo!</Link> */}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loggedUser: state.user.loggedInUser
    }
}

export default connect(mapStateToProps, null)(Home)