import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import userService from '../services/userService'
class NavUserNotificationMenu extends React.Component {

    state = {
        user: null,
        isHistorySown: false
    }

    componentDidMount(){
        
    }

    onClearNotification = () => {
        const { user } = this.props
        userService.clearNotifications(user)
    }

    onNotificationsHistory = () => {
        this.setState(prevState => ({ isHistorySown: !prevState.isHistorySown }))
    }

    render() {
        const { user } = this.props
        const { isHistorySown } = this.state
        let notifiToShow = user.notifications.filter(notifi => !notifi.isRead)

        if (isHistorySown) {
            return (
                <div className="nav-user-notifications-container flex column align-center">
                    <div className="notifications-header flex align-center justify-center">
                        <div className="history-back-btn" onClick={this.onNotificationsHistory}></div>
                        <h3>History</h3>
                    </div>

                    <div className="nav-notifications-wrapper flex column align-center">
                        {user.notifications.map((notifi, idx) => {
                            return <div className="user-notification flex align-center space-between"
                             key={idx} onClick={this.props.history.push(`${notifi.url}`)}>
                                <p>{notifi.content}</p>
                                {/* <Link className="notification-link" to={notifi.url}>Details</Link> */}
                            </div>

                        })}
                    </div>
                </div>

            )
        }
        return (
            <div className="nav-user-notifications-container flex column align-center">
                <div className="notifications-header"><h3>Notifications</h3></div>
                {!notifiToShow.length ?
                    <div className="notifications-all-read flex column align-center">
                        <img className="notification-nodata" />
                        <h3>All set! No Unread Notifications</h3>
                        <p>Click <span onClick={this.onNotificationsHistory}>here</span> to view notifications history</p>
                    </div>
                    :
                    <div className="nav-notifications-wrapper flex column align-center">
                        <button onClick={this.onClearNotification}>Clear All</button>
                        {notifiToShow.map((notifi, idx) => {
                            return <div className="user-notification flex align-center space-between" key={idx}>
                                <p>{notifi.content}</p>
                                <Link className="notification-link" to={notifi.url}>Details</Link>
                            </div>

                        })}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(NavUserNotificationMenu)