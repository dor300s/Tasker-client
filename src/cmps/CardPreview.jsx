import React from 'react'
import { Draggable } from "react-beautiful-dnd";

import { CardIconsPreview } from './CardIconsPreview.jsx'
import { CardLabelsPreview } from './CardLabelsPreview.jsx'

export default function CardPreview(props) {

    const { index, card, onDeleteCard, currBoard, cardListId, history } = props

    function showCard(cardId) {
        history.push(`/board/${currBoard._id}/${cardId}`)
    }

    return (
        <Draggable key={card.id} draggableId={card.id} index={index} >
            {(provided, snapshot) => {
                return (
                    <div
                        className={`card-preview drag ${snapshot.isDragging ? "isDragging" : ""}`} onClick={() => showCard(card.id)}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        style={{
                            userSelect: "none",
                            ...provided.draggableProps.style
                        }}
                    >
                        <div className="trash" onClick={(event) => onDeleteCard(card.id, cardListId, currBoard, event)}>X</div>
                        {Boolean(card.labels.length) && <CardLabelsPreview labels={card.labels} />}
                        {card.text}
                        <CardIconsPreview card={card} />
                    </div>
                );
            }}
        </Draggable>
    )
}
