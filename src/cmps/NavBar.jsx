import React from 'react';
import { withRouter } from "react-router-dom";
// import boardService from "../services/boardService.js"
import NavMenu from '../cmps/NavMenu'
import NavUserNotificationMenu from './NavUserNotificationMenu'
import { connect } from 'react-redux'
import { setBoards } from '../store/actions/boardActions.js'
import { getUser } from '../store/actions/userActions.js'
// import userService from '../services/userService.js'
import { BoardMembers } from './BoardMembers'
import InviteMemberModal from './InviteMemberModal'


class NavBar extends React.Component {

    state = {
        isMenuActive: false,
        isBoardActive: false,
        isUserMenuActive: false,
        isInviteModalActive: null
    }

    componentDidMount() {
      let pathName =  this.props.location.pathname
      let boardId = pathName.split('/')[2]
     
        this.props.getUser()
        if (!this.props.boards.length) this.props.setBoards()
    }

    componentDidUpdate() {
        // const { boardId } = this.props.match.params

        // this.getLoggedUserDetails()
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

    onInviteMember = () => {
        this.setState(prevState => ({ isInviteModalActive: !prevState.isInviteModalActive }))
    }

    render() {
        const { isMenuActive, isNotificationMenuActive, isBoardActive , isInviteModalActive } = this.state
        const { boards, activeBoard, history } = this.props
        const { loggedUser } = this.props

        if (!loggedUser) return <></>
        return (
            <nav className="nav-bar flex align-center space-between">
                <div className="flex align-center">
                    <button onClick={this.onMenuClick}>Hamurger</button>
                    {activeBoard && <BoardMembers onInvite={this.onInviteMember} history={history} board={activeBoard} />}
                    {isInviteModalActive && <InviteMemberModal />}
                    {activeBoard && <input type="text" placeholder="Find card" />}
                </div>
                {isMenuActive && <NavMenu history={history} boards={boards} closeMenu={this.onCloseMenu} />}
                <div className="flex align-center">
                    <button className="board-menu">Board Menu</button>
                    <span className="nav-notification-btn" onClick={this.onUserNotificationClick}></span>
                    {loggedUser.imgUrl ?
                        <div className="nav-user-profile" style={{
                            backgroundImage: "url(" + `${loggedUser.imgUrl}` + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                        </div>
                        :
                        <h3 className="nav-user-profile flex justify-center align-center">{loggedUser.userName.charAt(0)}</h3>}
                    {isNotificationMenuActive && <NavUserNotificationMenu history={history} user={loggedUser} />}
                </div>
            </nav>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loggedUser: state.user.loggedInUser,
        boards: state.boardApp.boards,
        activeBoard: state.boardApp.currBoard,
    }
}

const mapDispatchToProps = {
    setBoards,
    getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))


