import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

import { CardIconsPreview } from './CardIconsPreview.jsx'
import { CardLabelsPreview } from './CardLabelsPreview.jsx'
import { CardHeaderForm } from './CardHeaderForm.jsx'
import { render } from '@testing-library/react';

export default class CardPreview extends Component {

    state = {
        currCardId: this.props.card.id,
        isFocus:false
    }

    showCard = (cardId, history, currBoard) => {
        history.push(`/board/${currBoard._id}/${cardId}`)
    };

    onEditCardHeader = (ev) => {
        ev.stopPropagation();
        this.setState({ isFocus: true})
    }

    offEditCardHeader = () => {
        this.setState({ isFocus: false})
    }

    render() {

        const { index, card, onDeleteCard, currBoard, cardListId, history } = this.props
        const { showCard, onEditCardHeader } = this;
        return (
            <Draggable key={card.id} draggableId={card.id} index={index} >
                {(provided, snapshot) => {
                    return (
                        <>
                            <div
                                className={`card-preview drag ${snapshot.isDragging ? "isDragging" : ""}`} onClick={() => showCard(card.id, history, currBoard)}
                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                style={{
                                    userSelect: "none",
                                    ...provided.draggableProps.style
                                }}
                            >
                                <div className="top-icons flex space-between">
                                    {Boolean(card.labels.length) && <CardLabelsPreview histoy={history} labels={card.labels} />}
                                    {/* <div className="edit" onClick={(event) => onEditCardHeader(card.id, cardListId, event)}></div> */}
                                    <div className="trash" onClick={(event) => onDeleteCard(card.id, cardListId, event)}></div>
                                    <div className="edit" onClick={(event) => onEditCardHeader(card.id, cardListId, event)}></div>
                                </div>
                                {(this.state.isFocus)?  <CardHeaderForm/> : card.text}
                                <CardIconsPreview card={card} />
                            </div>
                        </>
                    );
                }}
            </Draggable>
        )
    }
}
