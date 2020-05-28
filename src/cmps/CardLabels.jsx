import React, { Component } from 'react'
import LabelsModal from './LabelsModal'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'

class CardLabels extends Component {

    state = {
        isDeleteBtnShow: false
    }

    onKeyUp = (idx, ev) => {
        const { card, board, isShown } = this.props
        card.labels[idx].title = ev.target.innerText
    }

    onBlur = () => {
        const { board } = this.props

        this.props.saveBoard(board)
    }

    onEnter = () => {
        this.setState({ isDeleteBtnShow: true })
    }

    onLeave = () => {
        this.setState({ isDeleteBtnShow: false })
    }

    onRemovelabel = (idx) =>{
        const { card , board } = this.props
        card.labels.splice(idx,1)
        this.props.saveBoard(board)
    }

    render() {
        const { card, board, isShown } = this.props
        const { isDeleteBtnShow } = this.state

        return (
            <div className="card-details-labels-container flex align-center">
                {card.labels.map((label, idx) => {
                    return <div onMouseEnter={this.onEnter} onMouseLeave={this.onLeave} key={idx}
                        style={{ backgroundColor: `${label.color}`, minWidth: "50px", minHeight: "15px", marginRight: "10px", borderRadius: "5px", marginTop: "10px", padding: "2px", color: "white", fontSize: "12px", textAlign: "center", position:"relative" }}>
                        <h4 onBlur={this.onBlur} contentEditable={true} suppressContentEditableWarning={true} spellCheck={false} onKeyUp={(ev) => this.onKeyUp(idx, ev)}
                         >{label.title}</h4>
                        {isDeleteBtnShow && <button onClick={() => this.onRemovelabel(idx)} className="lable-remove"></button>}
                    </div>
                })}
                {isShown && < LabelsModal card={this.props.card} board={this.props.board} />}
            </div>
        )
    }
}
const mapDispatchToProps = {
    saveBoard
}

export default connect(null, mapDispatchToProps)(CardLabels)