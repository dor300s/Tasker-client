import React from 'react';
import { connect } from 'react-redux'
import userService from '../services/userService'
import {HistoryNotifications} from './HistoryNotifications'
import {AllReadNotifications} from './AllReadNotifications';
import {UnReadNotifications} from './UnReadNotifications';
class NavUserNotificationMenu extends React.Component {

    state = {
        user: null,
        isHistoryShown: false
    }

    componentDidMount() {

    }

    onClearNotification = () => {
        const { user } = this.props
        userService.clearNotifications(user)
    }

    onNotificationsHistory = () => {
        this.setState(prevState => ({ isHistoryShown: !prevState.isHistoryShown }))
    }

    render() {
        const { user } = this.props
        const { isHistoryShown } = this.state
        let notifiToShow = user.notifications.filter(notifi => !notifi.isRead)

        if (isHistoryShown) return  <HistoryNotifications goBack={this.onNotificationsHistory} notifications={user.notifications} history={this.props.history} />
    
        return (
            <div className="nav-user-notifications-container flex column align-center">
                <div className="notifications-header"><h3>Notifications</h3></div>
                {!notifiToShow.length ?
                    
                    <AllReadNotifications showHistory={this.onNotificationsHistory} />
                    :
                    <UnReadNotifications markAsRead={this.onClearNotification} notifications={notifiToShow} />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(NavUserNotificationMenu)