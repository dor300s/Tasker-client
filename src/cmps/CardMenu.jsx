import React, { Component } from "react";
import { connect } from 'react-redux';
import { saveBoard } from '../store/actions/boardActions.js'



export class CardMenu extends Component {

        
    state = {
        currCardId: this.props.cardId,
        isFocus: false,
        isModalOpen: false
    }
    
    openMenu = (ev) => {
        ev.stopPropagation();
        this.setState({ isModalOpen: true });
        
    }
    
    closeMenu = () => {
        this.setState({ isModalOpen: false })
    }


    componentDidMount() {
        document.addEventListener("mousedown", this.closeCardMenu, false);
        document.addEventListener("keydown", this.closeCardMenu, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.closeCardMenu, false);
        document.removeEventListener("keydown", this.closeCardMenu, false);
    }

    closeCardMenu = (e) => {
        if (e.keyCode === 27) {
            this.props.closeMenu();
        }
    }

    activeEditMode = (e) => {
        e.stopPropagation()
        this.setState({ editTitleMode: true })
    }

    handleChange = (e) => {
        e.stopPropagation()
        this.setState({ title: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let { card } = this.props
        card.title = this.state.title;
        this.props.saveCard(card);
        this.setState({ editTitleMode: false })
        this.props.closeMenu();
    }

    onRemoveCard = (e) => {
        e.stopPropagation();
        const { card, removeCard } = this.props;
        removeCard(card._id);
    }

    render() {
        const { onDeleteCard, onEditCardHeader, cardId, cardListId } = this.props

        return (
        <div className="card-hidden flex">
            <div className="trash card-opacity" onClick={(event) => onDeleteCard(cardId, cardListId, event)}></div>
            <div className="edit card-opacity" onClick={(event) => onEditCardHeader(event)}></div>
        </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currBoard: state.boardApp.currBoard
    }
}
const mapDispatchToProps = {
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(CardMenu)
