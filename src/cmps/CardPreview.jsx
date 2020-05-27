import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardIconsPreview } from './CardIconsPreview.jsx'
import { CardLabelsPreview } from './CardLabelsPreview.jsx'
import { CardHeaderForm } from './CardHeaderForm.jsx'
import CardMenu from './CardMenu.jsx'
import { connect } from 'react-redux';
import { saveBoard } from '../store/actions/boardActions.js'


class CardPreview extends Component {

    state = {
        isFocus: false,
    }

    onEditCardHeader = (ev) => {
        ev.stopPropagation();
        this.setState({ isFocus: true })
    }

    offEditCardHeader = (cardId, cardListId, text) => {
        if (!cardId || !cardListId) {
            this.setState({ isFocus: false })
            return
        };

        const currBoard = JSON.parse(JSON.stringify(this.props.currBoard));
        const { cardLists } = currBoard;
        const list = cardLists.find(cardList => cardList.id === cardListId);
        const card = list.cards.find(card => card.id === cardId)
        card.text = text
        this.setState({ isFocus: false })
        this.props.saveBoard(currBoard);
    }


    showCard = (cardId, history, currBoard) => {
        history.push(`/board/${currBoard._id}/${cardId}`)
    };

    render() {

        const { index, card, currBoard, cardListId, history } = this.props
        const { showCard, offEditCardHeader, onEditCardHeader } = this;
        return (
            <Draggable key={card.id} draggableId={card.id} index={index} >
                {(provided, snapshot) => {
                    return (
                        <>
                            <div
                                className={`card-preview drag flex column ${snapshot.isDragging ? "isDragging" : ""}`} onClick={() => showCard(card.id, history, currBoard)}
                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                style={{
                                    userSelect: "none",
                                    ...provided.draggableProps.style
                                }}
                            >
                                <div className="img-and-menu" style={{ backgroundImage: `url(${card.covers.imgUrl})` }} >
                                    <CardMenu cardId={card.id} onEditCardHeader={onEditCardHeader} cardListId={cardListId} />
                                     <img src={card.covers.imgUrl} alt="" /> 
                                </div>
                                {Boolean(card.labels.length) && <CardLabelsPreview histoy={history} labels={card.labels} />}
                                {(this.state.isFocus) ? <CardHeaderForm cardHeader={card.text} cardListId={cardListId} cardId={card.id} offEditCardHeader={offEditCardHeader} /> : <div className="card-text">{card.text}</div>}
                                <CardIconsPreview card={card} />
                            </div>
                        </>
                    );
                }}
            </Draggable>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardPreview)
