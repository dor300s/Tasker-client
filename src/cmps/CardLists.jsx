import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";
import Lists from './Lists'


export default function CardLists(props) {

    const { columnId, column, index } = props
    return (
        <div className="flex column align-center" key={columnId} >
            <h2>{column.name}</h2>
            <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver
                                        ? "lightblue"
                                        : "lightgrey",
                                    padding: 4,
                                    width: 250,
                                    minHeight: 500
                                }}
                            >
                                {column.items.map((item, index) => {
                                    return (
                                        <Lists item={ item } index={ index } />
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
