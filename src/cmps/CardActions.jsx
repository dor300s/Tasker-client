import React from 'react'

export function CardActions(props) {
    return (
        <div className="card-details-actions flex column align-center">

            <h4>Quick actions</h4>

            {/* <span className="card-action-wrapper flex align-center" onClick={props.onMembers}>
                <span className="members " > </span>
                <h5 className="action-title ">Members</h5>
            </span> */}

            <span className="card-action-wrapper flex align-center space-between" onClick={props.onLabels}>
                <h5 className="action-title ">Lables</h5>
                <span className="action-label" > </span>
            </span>

            <span className="card-action-wrapper flex align-center space-between" onClick={props.onImages} >
                <h5 className="action-title ">Images</h5>
                <span className="action-image" > </span>
            </span>

            <span className="card-action-wrapper flex align-center space-between" onClick={props.onTodoAction}>
                <h5 className="action-title ">New todo item</h5>
                <span className="action-todos " > </span>
            </span>

            <span className="card-action-wrapper flex align-center space-between" onClick={() => props.openDatePicker()}>
                <h5 className="action-title ">Set due-Date</h5>
                <span className="action-calendar " > </span>
            </span>

        </div>
    )
}
