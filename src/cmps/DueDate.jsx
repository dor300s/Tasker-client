import React from 'react'

export function DueDate(props) {
    const { card } = props
    return (
        <div className="card-due-date-container">
            <div className="flex ">
                <span className="due-date"></span>
                <h4>Due Date</h4>
            </div>
            <p>{card.dueDate}</p>
        </div>
    )
}
