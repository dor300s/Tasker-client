import React from 'react';
import { Link, withRouter } from "react-router-dom";
// import boardService from "../services/boardService.js"
import NavMenu from '../cmps/NavMenu'
import NavUserNotificationMenu from './NavUserNotificationMenu'
import { connect } from 'react-redux'
import { setBoards, setBoard } from '../store/actions/boardActions.js'
import { getUser } from '../store/actions/userActions.js'
// import userService from '../services/userService.js'
import { BoardMembers } from './BoardMembers'
import { MemberPreview } from './MemberPreview'
import NavBarSearch from './NavBarSearch'
import InviteMemberModal from './InviteMemberModal'
import socketService from '../services/socketService'

class NavBar extends React.Component {

    state = {
        isMenuActive: false,
        isInviteModalOpen: null,
        isNotificationModalOpen: false
    }

    componentDidMount(prevProps) {
        socketService.setup()
        // let pathName = this.props.location.pathname
        // let boardId = pathName.split('/')[2] // todo get from global state
        this.props.getUser()
            .then(() => {
                if (!this.props.loggedUser) this.props.history.push('/')
                else this.props.setBoards()
            })
    }


    onMenuClick = () => {
        this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }))
    }

    onCloseMenu = () => {
        this.setState({ isMenuActive: false })
    }

    onCloseInviteMenu = () => {
        this.setState({ isInviteModalOpen: false })
    }

    onCloseNotificationMenu = () => {
        this.setState({ isNotificationModalOpen: false })
    }

    onUserNotificationClick = () => {
        this.setState(prevState => ({ isNotificationModalOpen: !prevState.isNotificationModalOpen }))
    }

    onInviteMember = () => {
        this.setState(prevState => ({ isInviteModalOpen: !prevState.isInviteModalOpen }))
    }

    render() {
        const { isMenuActive, isNotificationModalOpen, isInviteModalOpen } = this.state
        const { boards, activeBoard, history, loggedUser } = this.props
        const { onCloseInviteMenu, onInviteMember, onCloseNotificationMenu } = this


        if (!loggedUser) return <></>
        return (
            <nav className="nav-bar flex align-center space-between">
                <div className="nav-left-section flex align-center">
                    {activeBoard &&
                        <div className="board-button flex align-center justiry-center space-between cursor" onClick={this.onMenuClick}>
                            <div className="board-btn"></div>
                            <div className="board-txt">Boards</div>
                        </div>}
                    <Link className="home-button flex align-center justiry-center space-between cursor" onClick={this.onMenuClick}>
                        {/* <div className="home-btn"></div> */}
                        <div className="board-txt">Home</div>
                    </Link>
                    {activeBoard && <BoardMembers onInvite={onInviteMember} history={history} board={activeBoard} />}
                    {activeBoard && isInviteModalOpen && <InviteMemberModal isInviteModalOpen={isInviteModalOpen} onCloseInviteMenu={onCloseInviteMenu} />}
                    {activeBoard && < NavBarSearch currBoard={activeBoard} />}
                </div>
                {isMenuActive && <NavMenu history={history} boards={boards} onCloseMenu={this.onCloseMenu} />}
                <div className="nav-right-section flex align-center">
                    <button className="board-menu">Board Menu</button>
                    <span className="nav-notification-btn" onClick={this.onUserNotificationClick}></span>
                    <MemberPreview user={loggedUser} history={history} />
                    {isNotificationModalOpen && <NavUserNotificationMenu onCloseNotificationMenu={onCloseNotificationMenu} history={history} user={loggedUser} />}
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
    setBoard,
    getUser
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))
