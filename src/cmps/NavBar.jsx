import React from 'react';
import { Link, withRouter } from "react-router-dom";
// import boardService from "../services/boardService.js"
import NavMenu from '../cmps/NavMenu'
import NavUserNotificationMenu from './NavUserNotificationMenu'
import { connect } from 'react-redux'
import { setBoards, setBoard } from '../store/actions/boardActions.js'
import { getUser, update } from '../store/actions/userActions.js'
import { BoardMembers } from './BoardMembers'
import { MemberPreview } from './MemberPreview'
import NavBarSearch from './NavBarSearch'
import InviteMemberModal from './InviteMemberModal'
import socketService from '../services/socketService'
import ChartModal from './ChartModal';
import moment from 'moment'
import soundService from '../services/soundService'

class NavBar extends React.Component {

    state = {
        isMenuActive: false,
        isInviteModalOpen: null,
        isNotificationModalOpen: false
    }

    componentDidMount() {
        socketService.setup()

        this.props.getUser()
            .then(() => {
                if (!this.props.loggedUser) this.props.history.push('/')
                else this.props.setBoards()
            })
    }

    componentWillUnmount() {
        socketService.off(`user-invite-${this.props.loggedUser._id}`)
    }

    componentDidUpdate(prevProps) {
        if (this.props.loggedUser !== prevProps.loggedUser) {
            socketService.off(`user-invite-${this.props.loggedUser._id}`)

            socketService.on(`user-invite-${this.props.loggedUser._id}`, (invData) => {
                this.props.loggedUser.notifications.unshift({
                    data: `Exciting news! ${invData.sender} invited you to collaborate in a board.`,
                    createdAt: moment(invData.createdAt).fromNow(),
                    collabBoardId: invData.collabBoardId,
                    isRead: false,
                    type: 'board-collab'
                })
                this.props.update(this.props.loggedUser)
                soundService.notification()
            })
        }
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
        let notifiToShow;
        if (loggedUser) {
            notifiToShow = loggedUser.notifications.filter(notifi => !notifi.isRead)
        }

        if (!loggedUser) return <></>
        return (
            <nav className="nav-bar flex align-center space-between" >
                {!activeBoard && <img src="https://www.iconspng.com/images/logo-logo-black-on-white-background/logo-logo-black-on-white-background.jpg" width='60px' alt="" />}
                <div className="nav-left-section flex align-center">
                    {activeBoard &&
                        <div className="board-button flex align-center justiry-center space-between cursor" onClick={this.onMenuClick}>
                            <div style={{ marginRight: "5px" }} className="board-btn"></div>
                            <div className="board-txt">Boards</div>
                        </div>}
                    {activeBoard && <ChartModal />}

                    {activeBoard && <BoardMembers onInvite={onInviteMember} history={history} board={activeBoard} />}
                    {activeBoard && <InviteMemberModal isInviteModalOpen={isInviteModalOpen} onCloseInviteMenu={onCloseInviteMenu} />}
                </div>
                {< NavBarSearch /* boards={boards} */ history={history} currBoard={activeBoard} history={history} />}
                {<NavMenu history={history} isMenuActive={isMenuActive} boards={boards} currBoard={activeBoard} onCloseMenu={this.onCloseMenu} />}
                <div className="nav-right-section flex align-center">
                    {/* <button className="board-menu" onClick={() => history.push(`/board`)}>Board Menu</button> */}
                    <span style={{ backgroundColor: `${notifiToShow.length ? "rgb(252, 115, 126)" : ""} ` }} className="nav-notification-btn" onClick={this.onUserNotificationClick}></span>
                    <MemberPreview user={loggedUser} history={history} />
                    {<NavUserNotificationMenu onCloseNotificationMenu={onCloseNotificationMenu} isNotificationModalOpen={isNotificationModalOpen} history={history} />}
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
    getUser,
    update
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))
