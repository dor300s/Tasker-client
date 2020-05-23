import React from 'react'

export function AllReadNotifications(props) {
    return (
        <div className="notifications-all-read flex column align-center">
            <img className="notification-nodata" />
            <h3>All set! No Unread Notifications</h3>
            <p>Click <span onClick={()=>props.showHistory()}>here</span> to view notifications history</p>
        </div>
    )
}
