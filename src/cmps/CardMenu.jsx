import React, { Component } from "react";
import { connect } from 'react-redux';
import { saveBoard } from '../store/actions/boardActions.js'



class CardMenu extends Component {

    state ={
        isMenuOpen: false
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
            <div className="menu-container flex">
                    <div className="menu-btn flex hidden" onClick={(event) => this.openMenu(event)}></div>
                {isMenuOpen && <div className="option-modal flex">
                    <div className="trash hidden" onClick={(event) => this.onDeleteCard(cardId, cardListId, event)}></div>
                    <div className="edit hidden" onClick={(event) => onEditCardHeader(event)}></div>
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
