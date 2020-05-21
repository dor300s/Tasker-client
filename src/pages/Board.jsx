import React, { Component } from "react";
import CardDetails from './CardDetails.jsx';
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from '../tempSeviceData/list-initial-data.js'
import CardListPreview from '../cmps/CardListPreview.jsx'
import uuid from "uuid/v4";


const itemsFromBackend = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second task" },
    { id: uuid(), content: "Third task" },
    { id: uuid(), content: "Fourth task" },
    { id: uuid(), content: "Fifth task" }
];

const columns = {
    [uuid()]: {
        name: "Requested",
        items: itemsFromBackend
    },
    [uuid()]: {
        name: "To do",
        items: []
    },
    [uuid()]: {
        name: "In Progress",
        items: []
    },
    [uuid()]: {
        name: "Done",
        items: []
    }
};


export default class Board extends Component {

    state = {
        columns
    };

    setColumns = (columns) => {
        this.setState({ columns })
    }

     onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };


    render() {

        const { setColumns, onDragEnd } = this;
        const { columns } = this.state;

        return (
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <DragDropContext
                    onDragEnd={result => onDragEnd(result, columns, setColumns)}
                >
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (<CardListPreview columnId={columnId} column={column} index={index}/>
                         );
                    })}
                </DragDropContext>
            </div>
        );
    }
}

