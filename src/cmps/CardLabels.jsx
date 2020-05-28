import React, { Component } from 'react'
import LabelsModal from './LabelsModal'

export default class CardLabels extends Component {

    state = {
        isLabelsModalShown: true
    }

    render() {
        const { card, board } = this.props
        const { isLabelsModalShown } = this.state
        return (
            <div className="card-details-labels-container flex align-center">
                {card.labels.map((label, idx) => {
                    return <div key={idx}
                        style={{ backgroundColor: `${label.color}`, minWidth: "50px", minHeight: "15px", marginRight: "10px", borderRadius: "5px" , marginTop:"10px" }}>{label.title}</div>
                })}
                {isLabelsModalShown && < LabelsModal card={this.props.card} board={this.props.board} />}
            </div>
        )
    }
}
