import React from 'react'
import { Link } from 'react-router-dom'
export function UnReadNotifications(props) {
    const { notifications } = props

    return (
        <div className="nav-notifications-wrapper flex column align-center">
            <button onClick={() => props.markAsRead()}>Clear All</button>
            {notifications.map((notifi, idx) => {
                if (notifi.type === 'board-collab') {
                    return <div className="user-notification flex column align-center" key={idx}>
                        <p>{notifi.data}</p>
                        <div className="board-collab-btns flex space-around">
                            <button onClick={()=> props.onBoardCollab(notifi)}>Join</button>
                            <button>Decline</button>
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
