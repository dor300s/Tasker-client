import React, { Component } from 'react'
import { connect } from 'react-redux'
import userService from '../services/userService'
import { HistoryNotifications } from './HistoryNotifications'
import { AllReadNotifications } from './AllReadNotifications';
import { UnReadNotifications } from './UnReadNotifications';
import { saveBoard } from '../store/actions/boardActions.js'

class NavUserNotificationMenu extends Component {

    state = {
        user: null,
        isHistoryShown: false
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.onCloseNotificationMenu, false);
        document.addEventListener("keydown", this.onCloseNotificationMenu, false);
    }

    // componentWillUnmount() {
    //     document.removeEventListener("mousedown", this.onCloseNotificationMenu, false);
    //     document.removeEventListener("keydown", this.onCloseNotificationMenu, false);
    // }

    onCloseNotificationMenu = (ev) => {
        ev.stopPropagation();
        if (!this.node.contains(ev.target) || ev.keyCode === 27) {
            // this.setState({ isHistoryShown: false })
            this.props.onCloseNotificationMenu();
        }
    }


    onClearNotification = () => {
        const { user } = this.props
        userService.clearNotifications(user)

    }

    onNotificationsHistory = () => {
        this.setState(prevState => ({ isHistoryShown: !prevState.isHistoryShown }))
    }

    render() {
        const { user, isNotificationModalOpen } = this.props
        const { isHistoryShown } = this.state
        let notifiToShow = user.notifications.filter(notifi => !notifi.isRead)

        // if (isHistoryShown) return <HistoryNotifications goBack={this.onNotificationsHistory} notifications={user.notifications} history={this.props.history} />

        return (
            <div ref={node => this.node = node}>
                {isHistoryShown && <HistoryNotifications isShown={isNotificationModalOpen} goBack={this.onNotificationsHistory} notifications={user.notifications} history={this.props.history} />}

                {!isHistoryShown && <div className={`nav-user-notifications-container ${(isNotificationModalOpen) ? "modal-open" : ""} flex column align-center`}>
                    <div className="notifications-header"><h3>Notifications</h3></div>
                    {!notifiToShow.length ?

                        <AllReadNotifications showHistory={this.onNotificationsHistory} />
                        :
                        <UnReadNotifications markAsRead={this.onClearNotification} notifications={notifiToShow} />
                    }
                </div>}
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
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(NavUserNotificationMenu)