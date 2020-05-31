import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'
import TextareaAutosize from 'react-textarea-autosize';
class CardDescription extends Component {

    state = {
        isEditMode: false,
        description: '',
        dynamicClass: ''
    }

    componentDidMount() {
        const { card, board } = this.props
        this.setState({ description: card.description })
    }

    onDescClicked = () => {
        this.setState({ isEditMode: true })
    }

    onTextAreaLeave = () => {
        const { card, board } = this.props
        this.setState({ isEditMode: false, dynamicClass: '' }, () => {
            card.description = this.state.description
            this.props.saveBoard(board)
        })
    }

    onTextFocus = () => {
        this.setState({ dynamicClass: 'text-area' })
    }

    onDescEdit = ({ target }) => {

        this.setState({ description: target.value })

    }

    moveCaretAtEnd(ev) {
        var temp_value = ev.target.value
        ev.target.value = ''
        ev.target.value = temp_value
    }


    render() {
        const { card } = this.props
        const { isEditMode, description, dynamicClass } = this.state
        return (
            <div className="card-details-description">
                <div className="flex ">
                    <span className="text"></span>
                    <h4>Description</h4>
                </div>
                {!isEditMode && <p onClick={this.onDescClicked}>{card.description || 'Add some details about this card'}</p>}
                {isEditMode && <TextareaAutosize className={dynamicClass} onFocus={this.onTextFocus} onBlur={this.onTextAreaLeave} type="text" autoFocus={true}
                    value={description} placeholder="Add more details about this card..." onChange={this.onDescEdit}
                    onFocus={this.moveCaretAtEnd} spellCheck={false} />}
            </div>
        )
    }
}

const mapDispatchToProps = {
    saveBoard
}

export default connect(null, mapDispatchToProps)(CardDescription)