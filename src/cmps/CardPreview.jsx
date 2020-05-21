import React from 'react'
import { Draggable } from "react-beautiful-dnd";


export default function CardPreview(props) {

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
                        className={`card-preview ${snapshot.isDragging ? "isDragging" : "isNotDraging" }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: "none",
                        
                            // backgroundColor: snapshot.isDragging
                            //     ? "#263B4A"
                            //     : "#456C86",
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
