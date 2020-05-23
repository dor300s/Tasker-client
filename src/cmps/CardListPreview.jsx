import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";
import CardPreview from './CardPreview.jsx'


export default function CardListPreview(props) {

    const { cardListId, cardList, index, onDeleteList, onDeleteCard, onAddCard, currBoard, history } = props

    return (
        <Draggable key={cardListId} draggableId={cardListId} index={index} >
            {(provided, snapshot) => (
                <div className={`wrap-card-list flex`} key={cardListId}
                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Droppable droppableId={cardListId} key={cardListId} type={"card"}>
                        {(provided, snapshot) => (
                            <div className={`card-list flex column ${snapshot.isDraggingOver ? "lightblue" : ""}`} >
                                <h2 className="trash" onClick={() => onDeleteList(currBoard, cardListId)}></h2>
                                <h2 >{cardList.title}</h2>
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {cardList.cards.map((card, index) => {
                                        return (
                                            <CardPreview key={card.id} cardListId={cardListId} currBoard={currBoard} onDeleteCard={onDeleteCard} card={card} index={index} history={history} />
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                                <div onClick={() => { onAddCard(props.currBoard, cardListId) }} className={`card-preview`} >+add card+</div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}