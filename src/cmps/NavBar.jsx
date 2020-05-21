import React from 'react';
import boardService from "../services/boardService.js"
import  NavMenu  from '../cmps/NavMenu'
import { connect } from 'react-redux'
import { setBoards } from '../store/actions/boardActions.js'
import userService from '../services/userService.js'

class NavBar extends React.Component {

    state = {
        boards: null,
        isMenuActive: false,
        isUserMenuActive: false,
        loggedUser: JSON.parse(window.localStorage.getItem('loggedUser'))
    }

    componentDidMount() {
        // this.getLoggedUserDetails() // only at production ENV 
        this.props.setBoards()
        boardService.query()
    }

    getLoggedUserDetails = () => {
        userService.get(this.props.loggedUser._id)
            .then(res => this.setState({ loggedUser: res }))
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
        const { isMenuActive, isUserMenuActive, loggedUser } = this.state
        const { boards } = this.props

        if (!loggedUser) return ' Loading... '
        return (
            <nav className="nav-bar flex align-center space-between">
                <button onClick={this.onMenuClick}>Hamurger</button>
                {isMenuActive && <NavMenu history={this.props.history} boards={boards} closeMenu={this.onCloseMenu} />}
                <h2>LOGO</h2>
                <div className="flex align-center">
                    <button>N</button>
                    {loggedUser.imgUrl ?
                    <div className="nav-user-profile" onClick={this.onUserProfileClick} style={{
                        backgroundImage: "url(" + `${loggedUser.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}> 
                    </div>
                    :
                <h3 onClick={this.onUserProfileClick} className="nav-user-profile flex justify-center align-center">{loggedUser.userName.charAt(0)}</h3>}
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)