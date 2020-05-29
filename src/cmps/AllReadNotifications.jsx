import React from 'react'

export function AllReadNotifications(props) {
    return (
        <div className="notifications-all-read flex column align-center">
            <img className="notification-nodata" />
            <h3>All set! No Unread Notifications</h3>
            <span className="notifi-history-btn" onClick={()=>props.showHistory()}>View history</span>
        </div>
    )
}
