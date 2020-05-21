import React from 'react';
import { Link } from "react-router-dom";
import { getBoards } from "../tempSeviceData/tempBoardData"
import { NavMenu } from '../cmps/NavMenu'
import { connect } from 'react-redux'

class NavBar extends React.Component {

    state = {
        boards: null,
        isMenuActive: false,
        isUserMenuActive: false
    }

    componentDidMount() {
        
       const boards =  getBoards()

        this.setState({ boards }, () => { console.log('Nav Mount- boards:', this.state.boards) })
    }

    onMenuClick = () => {
        this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }))
    }

    onCloseMenu = () => {
        this.setState({ isMenuActive: false })
    }

    onUserProfileClick = () => {
        this.setState(prevState => ({ isUserMenuActive: !prevState.isUserMenuActive }))
    }

    render() {
        const { isMenuActive, boards , isUserMenuActive} = this.state
        return (
            <nav className="nav-bar flex align-center space-between">
                <button onClick={this.onMenuClick}>Hamurger</button>
                {isMenuActive && <NavMenu history={this.props.history} boards={boards} closeMenu={this.onCloseMenu} />}
                <h2>LOGO</h2>
                <div className="flex align-center">
                    <button>N</button>
                    <div className="nav-user-profile flex justify-center align-center">
                        <h3 onClick={this.onUserProfileClick}>RA</h3>
                        {/* {isUserMenuActive && <NavUserMenu />} */}
                    </div>
                </div>
            </nav>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loggedUser: state.user.loggedInUser

    }
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)