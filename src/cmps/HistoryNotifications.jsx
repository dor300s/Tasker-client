import React from 'react'

export function HistoryNotifications(props) {
    const { notifications , history } = props
    return (
        <div className="nav-user-notifications-container flex column align-center">
            <div className="notifications-header flex align-center justify-center">
                <div className="history-back-btn" onClick={()=>props.goBack()}></div>
                <h3>History</h3>
            </div>

            <div className="nav-notifications-wrapper flex column align-center">
                {notifications.map((notifi, idx) => {
                    return <div className="user-notification flex align-center space-between"
                        key={idx} onClick={() => history.push(`${notifi.url}`)}>
                        <p>{notifi.content}</p>
                    </div>

                })}
            </div>
        </div>
    )
}
