import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function DndCard({ text, id, index }) {
    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <h3>{text}</h3>
                </div>
            )}
        </Draggable>
    )
}