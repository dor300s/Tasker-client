import React from 'react'

export function DueDate(props) {
    const { date } = props
    return (
        <div className="card-due-date-container">
            <div className="flex ">
                <span className="clock"></span>
                <h4>Due Date</h4>
            </div>
            <p>{date}</p>
        </div>
    )
}
