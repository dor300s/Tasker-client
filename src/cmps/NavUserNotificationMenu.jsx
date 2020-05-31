import React, { Component } from 'react'
import { connect } from 'react-redux'
import userService from '../services/userService'
import boardService from '../services/boardService'
import { HistoryNotifications } from './HistoryNotifications'
import { AllReadNotifications } from './AllReadNotifications';
import { UnReadNotifications } from './UnReadNotifications';
import { saveBoard } from '../store/actions/boardActions.js'
import {getUser , update , setUser} from '../store/actions/userActions'


class NavUserNotificationMenu extends Component {

    state = {
        // user: null,
        isHistoryShown: false
    }

    componentDidMount() {
        this.props.getUser()
        document.addEventListener("mousedown", this.onCloseNotificationMenu, false);
        document.addEventListener("keydown", this.onCloseNotificationMenu, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onCloseNotificationMenu, false);
        document.removeEventListener("keydown", this.onCloseNotificationMenu, false);
    }

    onCloseNotificationMenu = (ev) => {
        ev.stopPropagation();
        if (!this.node.contains(ev.target) || ev.keyCode === 27) {
            this.props.onCloseNotificationMenu();
        }
    }


    onClearNotification = () => {
        const { loggedUser } = this.props
        userService.clearNotifications(loggedUser)
        this.props.update(loggedUser)
    }

    onNotificationsHistory = () => {
        this.setState(prevState => ({ isHistoryShown: !prevState.isHistoryShown }))
    }

    onBoardCollab = (notifi , idx) => {
        const {loggedUser} = this.props
        boardService.get(notifi.collabBoardId)
            .then(res => {
                let userIdxOnBoard = res.members.findIndex(user => user._id === loggedUser._id)
                
                if(userIdxOnBoard !== -1) {
                    loggedUser.notifications.splice(idx , 1)
                    return
                }
                res.members.push({
                    _id: loggedUser._id ,
                    imgUrl: loggedUser.imgUrl,
                    userName: loggedUser.userName,
                    fullName: loggedUser.fullName
                })
                loggedUser.notifications.splice(idx , 1)
                this.props.update(loggedUser)
                this.props.saveBoard(res)
                this.props.history.push(`/board/${res._id}`)
            },this.props.onCloseNotificationMenu())  
}

    onInviteDecline = (idx) =>{
        const {loggedUser} = this.props
        loggedUser.notifications.splice(idx , 1)
        this.props.update(loggedUser)
    }

    render() {
        const { loggedUser, isNotificationModalOpen } = this.props
        const { isHistoryShown } = this.state
        let notifiToShow = loggedUser.notifications.filter(notifi => !notifi.isRead)

        return (
            <div ref={node => this.node = node}>

                {<div className={`nav-user-notifications-container ${(isNotificationModalOpen) ? "modal-open" : ""} flex column align-center`}>
                    {isHistoryShown && <HistoryNotifications isShown={isNotificationModalOpen} goBack={this.onNotificationsHistory} notifications={loggedUser.notifications} history={this.props.history} />}
                    {!isHistoryShown &&
                        <>
                            <div className="notifications-header"><h3>Notifications</h3></div>
                            {!notifiToShow.length ?

                                <AllReadNotifications showHistory={this.onNotificationsHistory} />
                                :
                                <UnReadNotifications onInviteDecline={this.onInviteDecline} markAsRead={this.onClearNotification} notifications={notifiToShow} onBoardCollab={this.onBoardCollab} user={loggedUser} />
                            }
                        </>}
                </div>
                }
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        loggedUser: state.user.loggedInUser
    }
}

const mapDispatchToProps = {
    saveBoard,
    getUser,
    update,
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(NavUserNotificationMenu)