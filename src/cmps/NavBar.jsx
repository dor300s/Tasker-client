import React from 'react';
import { withRouter } from "react-router-dom";
import boardService from "../services/boardService.js"
import  NavMenu  from '../cmps/NavMenu'
import  NavUserNotificationMenu  from './NavUserNotificationMenu'
import { connect } from 'react-redux'
import { setBoards } from '../store/actions/boardActions.js'
import userService from '../services/userService.js'

class NavBar extends React.Component {

    state = {
        boards: null,
        isMenuActive: false,
        isUserMenuActive: false,
        loggedUser:  null
    }

    componentDidMount() {
        this.getLoggedUserDetails()
    }

    componentDidMount() {
        this.getLoggedUserDetails() 
        this.props.setBoards()
        boardService.query()
    }

    componentDidUpdate(){
<<<<<<< HEAD
        this.getLoggedUserDetails()
    }

    getLoggedUserDetails = () => {
=======
        this.getLoggedUserDetails()  
    }

    getLoggedUserDetails = () => {
        if(!this.props.loggedUser) return
>>>>>>> d5b0aaee52333a7ce418682e4b393f262548245b
        userService.get(this.props.loggedUser?._id)
            .then(res => this.setState({ loggedUser: res }))
    }

    onMenuClick = () => {
        this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }))
    }

    onCloseMenu = () => {
        this.setState({ isMenuActive: false })
    }

    onUserNotificationClick = () => {
        this.setState(prevState => ({ isNotificationMenuActive: !prevState.isNotificationMenuActive }))
    }

    render() {
        const { isMenuActive, isNotificationMenuActive, loggedUser } = this.state
        const { boards } = this.props
<<<<<<< HEAD
        
=======

>>>>>>> d5b0aaee52333a7ce418682e4b393f262548245b
        if (!loggedUser) return <> </>
        return (
            <nav className="nav-bar flex align-center space-between">
                <button onClick={this.onMenuClick}>Hamurger</button>
                {isMenuActive && <NavMenu history={this.props.history} boards={boards} closeMenu={this.onCloseMenu} />}
                <h2>LOGO</h2>
                <div className="flex align-center">
                    <button onClick={this.onUserNotificationClick}>N</button>
                    {loggedUser.imgUrl ?
                    <div className="nav-user-profile"  style={{
                        backgroundImage: "url(" + `${loggedUser.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}> 
                    </div>
                    :
                <h3 className="nav-user-profile flex justify-center align-center">{loggedUser.userName.charAt(0)}</h3>}
                {isNotificationMenuActive && <NavUserNotificationMenu history={this.props.history} user={loggedUser} />}
                </div>
            </nav>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loggedUser: state.user.loggedInUser,
        boards: state.boardApp.boards
    }
}

const mapDispatchToProps = {
    setBoards,
}

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))