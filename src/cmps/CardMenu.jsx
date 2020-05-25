import React, { Component } from "react";
import { connect } from 'react-redux';
import { saveBoard } from '../store/actions/boardActions.js'


class CardMenu extends Component {

    state = {
        isMenuOpen: false
    }

    componentWillMount() {
        document.addEventListener("mousedown", this.closeBoardMenu, false);
        document.addEventListener("keydown", this.closeBoardMenu, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.closeBoardMenu, false);
        document.removeEventListener("keydown", this.closeBoardMenu, false);
    }

    closeBoardMenu = (ev) => {
        ev.stopPropagation();
        if (!this.node.contains(ev.target) || ev.keyCode === 27) {
            this.closeMenu(ev);
        }
    }

    closeMenu = (ev) => {
        ev.stopPropagation();
        this.setState({ isMenuOpen: false })
    }

    openMenu = (ev) => {
        ev.stopPropagation();
        this.setState({ isMenuOpen: true })
    }

    onDeleteCard = (cardId, cardListId, ev) => {
        ev.stopPropagation()
        console.log(this.props.currBoard)
        const currBoard = JSON.parse(JSON.stringify(this.props.currBoard));
        const { cardLists } = currBoard;
        const list = cardLists.find(cardList => cardList.id === cardListId);
        const cardIdx = list.cards.findIndex(card => card.id === cardId);

        list.cards.splice(cardIdx, 1);
        this.props.saveBoard(currBoard);
    }

    render() {
        const { onDeleteCard, onEditCardHeader, cardId, cardListId } = this.props
        const { isMenuOpen } = this.state;

        return (
            <div className="card-menu-container">
                <div ref={node => this.node = node} className="menu-btn hidden" onClick={(event) => this.openMenu(event)}></div>
                {isMenuOpen && <div className="card-menu-options">
                    <div onClick={(event) => onEditCardHeader(event)}>Edit Title</div>
                    <div onClick={(event) => onDeleteCard(cardId, cardListId, event)}>Delete Card</div>
                </div>}
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
