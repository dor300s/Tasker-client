import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import CardPreview from './CardPreview.jsx'


export default function CardListPreview(props) {

    const { columnId, column, index } = props
    return (
        <div className="flex column align-center" key={columnId} >
            <h2>{column.name}</h2>
            <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                className={`card-list ${snapshot.isDraggingOver ? "lightblue" : "lightgrey"}`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {column.items.map((item, index) => {
                                    return (
                                        <CardPreview item={ item } index={ index } />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
        </div>

    )
}
