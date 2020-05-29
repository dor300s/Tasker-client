import React from 'react'
import { Link } from 'react-router-dom'
export function UnReadNotifications(props) {

    let notifiToShow = props.user.notifications.filter(notifi => !notifi.isRead)

    return (
        <div className="nav-notifications-wrapper flex column align-center">
            <button onClick={() => props.markAsRead()}>Clear All</button>
            {notifiToShow.map((notifi, idx) => {
                if (notifi.type === 'board-collab') {
                    return <div className="user-notification flex align-start" key={idx}>
                        <p>{notifi.data}</p>
                        <div className="board-collab-btns flex column space-around">
                            <button onClick={()=> props.onBoardCollab(notifi , idx)}>Join</button>
                            <button onClick={()=> props.onInviteDecline(idx)}>Decline</button>
                        </div>
                    </div>
                }
                else {
                    return <div className="user-notification flex align-center space-between" key={idx}>
                        <p>{notifi.data}</p>
                        <Link className="notification-link" to={notifi.url}>Details</Link>
                    </div>
                }

            })}
        </div>
    )
}
