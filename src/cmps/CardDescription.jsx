import React, { Component } from 'react'
import { connect } from 'react-redux'
import {saveBoard} from '../store/actions/boardActions'
class CardDescription extends Component {

    state ={
        isEditMode: false,
        description: ''
    }

    componentDidMount(){
        const { card , board } = this.props
        this.setState({description: card.description})
    }

    onDescClicked = () =>{
        this.setState({isEditMode: true})
    }

    onTextAreaLeave = () =>{
        const { card , board } = this.props
        this.setState({isEditMode: false},()=>{
            card.description = this.state.description
            this.props.saveBoard(board)
        })
    }

    onDescEdit = ({target}) => {
        
        this.setState({description: target.value})
        
    }

    render() {
        const { card } = this.props
        const { isEditMode , description } = this.state
        return (
            <div className="card-details-description">
                <div className="flex ">
                    <span className="text"></span>
                    <h4>Description</h4>
                </div>
                {!isEditMode && <p onClick={this.onDescClicked}>{card.description || 'Add some details about this board' }</p>}
                {isEditMode && <textarea onBlur={this.onTextAreaLeave} type="text" autoFocus={true} 
                value={description } placeholder="Add more details about this card..." onChange={this.onDescEdit}
                 />}

            </div>
        )
    }
}

const mapDispatchToProps = {
    saveBoard
}

export default connect(null, mapDispatchToProps)(CardDescription)