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
            // setTimeout(() => this.setState({ isMenuOpen: false }), 200);
            this.setState({ isMenuOpen: false })
        }
    }

    openMenu = (ev) => {
        ev.stopPropagation();
        this.setState({ isMenuOpen: true })
    }

    onDeleteCard = (cardId, cardListId, ev) => {
        ev.stopPropagation()
        const currBoard = this.props.currBoard;
        const { cardLists } = currBoard;
        const list = cardLists.find(cardList => cardList.id === cardListId);
        const cardIdx = list.cards.findIndex(card => card.id === cardId);

        list.cards.splice(cardIdx, 1);
        this.props.saveBoard(currBoard);
    }

    render() {
        const { onEditCardHeader, cardId, cardListId } = this.props
        const { onDeleteCard } = this
        const { isMenuOpen } = this.state;

        return (
            <div ref={node => this.node = node} className="card-menu-container">
                <div  className="menu-btn hidden" onClick={(event) => this.openMenu(event)}></div>
                {isMenuOpen && <div className="menu-options card-menu">
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
