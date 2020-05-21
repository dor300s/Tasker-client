import React from 'react'
import { Draggable } from "react-beautiful-dnd";


export default function Lists(props) {

    const {index, item} = props

    return (
        <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
        >
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: "none",
                            padding: 16,
                            margin: "0 0 8px 0",
                            minHeight: "50px",
                            backgroundColor: snapshot.isDragging
                                ? "#263B4A"
                                : "#456C86",
                            color: "white",
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
