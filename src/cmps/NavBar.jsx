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
        // boards: null,
        isMenuActive: false,
        isBoardActive: false,
        isUserMenuActive: false,
        // loggedUser: null
    }

    componentDidMount() {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', this.props);

        this.props.getUser()
        // this.getLoggedUserDetails()
        if (!this.props.boards.length) this.props.setBoards()
    }

    componentDidUpdate() {
        // const { boardId } = this.props.match.params
        // console.log('navbar propsssssssssssssss', this.props);

        // this.getLoggedUserDetails()
    }

    /* getLoggedUserDetails = () => {
        if (!this.props.loggedUser) return
        this.props.getUser()
    } */

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
        const { isMenuActive, isNotificationMenuActive, isBoardActive } = this.state
        const { boards, activeBoard, history } = this.props
        const { loggedUser } = this.props
        console.log('LOGEEDDD USERRRRRRRRR', loggedUser);
        console.log('BOARDSSSSssssssssssssssssssss', boards);


        if (!loggedUser) return <></>
        return (
            <nav className="nav-bar flex align-center space-between">
                <div className="flex align-center">
                    <button onClick={this.onMenuClick}>Hamurger</button>
                    {activeBoard && <BoardMembers onInvite={this.onInviteMember} history={history} board={activeBoard} />}
                    {activeBoard && <InviteMemberModal />}
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


