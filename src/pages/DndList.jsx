import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DndCard from './DndCard';
import DndAddBtn from './DndAddBtn';


export default function DndList({ listId, title, cards }) {

    return (
        <Droppable droppableId={listId}>
            {provided => (
                <div className="board-list" {...provided.droppableProps} ref={provided.innerRef}>
                    <h2>{title}</h2>
                    {cards.map((card, index) => (
                        <DndCard key={card.id} text={card.text} id={card.id} index={index} />
                    ))}
                    {provided.placeholder}
                    <DndAddBtn list={listId}/>
                </div>
            )}
        </Droppable>
    )
}
