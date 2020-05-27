import React from 'react'

export function CardActions(props) {
    return (
        <div className="card-details-actions flex column align-center">

            <h4>ADD TO CARD</h4>

            <span className="card-action-wrapper flex align-center" onClick={props.onMembers}>
                <span className="members " > </span>
                <h5 className="action-title ">Members</h5>
            </span>

            <span className="card-action-wrapper flex align-center">
                <span className="label " > </span>
                <h5 className="action-title ">Lables</h5>
            </span>

            <span className="card-action-wrapper flex align-center" onClick={props.onImages} >
                <span className="attachments " > </span>
                <h5 className="action-title ">Images</h5>
            </span>

            <span className="card-action-wrapper flex align-center">
                <span className="list " > </span>
                <h5 className="action-title ">Todos</h5>
            </span>

            <span className="card-action-wrapper flex align-center" onClick={() => props.openDatePicker()}>
                <span className="clock " > </span>
                <h5 className="action-title ">Due Date</h5>
            </span>

        </div>
    )
}
