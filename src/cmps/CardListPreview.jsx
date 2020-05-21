import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";
import CardPreview from './CardPreview.jsx'


export default function CardListPreview(props) {

    const { columnId, column, index } = props
    return (
        <Draggable key={columnId} draggableId={columnId} index={index} >
            {(provided, snapshot) => (
            <div className="card-list flex column align-center" key={columnId} 
             ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <h2  >{column.title}</h2>
                <Droppable droppableId={columnId} key={columnId} type={"card"}>
                    {(provided, snapshot) => (
                            <div
                                className={`card-col ${snapshot.isDraggingOver ? "lightblue" : "lightgrey"}`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                     
                            >
                                {column.cards.map((card, index) => {
                                    return (
                                        <CardPreview key={card.id} card={card} index={index} />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                </Droppable>
             </div>
            )}
        </Draggable>
    )
}


// <div
// className={`card-preview ${snapshot.isDragging ? "isDragging" : ""}`}
// ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
// style={{
//     userSelect: "none",
//     ...provided.draggableProps.style
// }}
// >
// {card.content}
// </div>
