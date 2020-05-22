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
        loggedUser:  null
    }

    componentDidMount() {
        this.getLoggedUserDetails()
        this.props.setBoards()
        boardService.query()
    }

    componentDidUpdate(){
        this.getLoggedUserDetails()
    }

    getLoggedUserDetails = () => {
        userService.get(this.props.loggedUser?._id)
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
        
        if (!loggedUser) return <> </>
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