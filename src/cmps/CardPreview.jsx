import React from 'react'
import { Draggable } from "react-beautiful-dnd";


export default function CardPreview(props) {

    const {index, card, onDeleteCard, currBoard} = props

    return (
        <Draggable key={card.id} draggableId={card.id} index={index} >
            {(provided, snapshot) => {
                return (
                    <div
                        className={`card-preview drag ${snapshot.isDragging ? "isDragging" : "" }`}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        style={{
                            userSelect: "none",
                            ...provided.draggableProps.style
                        }}
                    >
                        <div onClick={() => onDeleteCard(card.id, currBoard)}>X</div>
                        {card.text}
                    </div>
                );
            }}
        </Draggable>
    )
}
