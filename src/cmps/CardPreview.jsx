import React from 'react'
import { Draggable } from "react-beautiful-dnd";


export default function CardPreview(props) {

    const {index, item} = props

    return (
        <Draggable key={item.id} draggableId={item.id} index={index} >
            {(provided, snapshot) => {
                return (
                    <div
                        className={`card-preview ${snapshot.isDragging ? "isDragging" : "" }`}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        style={{
                            userSelect: "none",
                            ...provided.draggableProps.style
                        }}
                    >
                        {item.content}
                    </div>
                );
            }}
        </Draggable>
    )
}
