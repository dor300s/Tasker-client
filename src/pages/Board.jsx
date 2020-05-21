import React, { Component } from "react";
import CardDetails from './CardDetails.jsx';
import ReactDOM from "react-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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


const columns = [
    {
        id: uuid(),
        name: "Requested",
        items: itemsFromBackend
    },
    {
        id: uuid(),
        name: "Todo",
        items: []
    },
    {
        id: uuid(),
        name: "Done",
        items: []
    },
    {
        id: uuid(),
        name: "Archive",
        items: []
    },
];


export default class Board extends Component {

    state = {
        columns
    };

    setColumns = (columns) => {
        this.setState({ columns })
    }

    onDragEnd = (result, stateColumns, setColumns) => {
        const columns = JSON.parse(JSON.stringify(stateColumns))
        console.log(result)
        if (!result.destination) return;
        const { source, destination } = result;

        const sourceColumn = columns.find(column => source.droppableId === column.id);
        const destColumn = columns.find(column => destination.droppableId === column.id);

        const sourceItems = sourceColumn.items;
        const destItems = destColumn.items;
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns(columns);

    };

    render() {


        const { setColumns, onDragEnd } = this;
        const { columns } = this.state;
        console.log(columns)
        console.log(Object.entries(columns))


        return (
            <div /* style={{ display: "flex", justifyContent: "center", height: "100%" }} */>
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)} >
                    <Droppable droppableId={"all-columns"} direction="horizontal" type="column" >
                        {(provided, snapshot) => (
                            <div className={`card-col  ${snapshot.isDraggingOver ? "lightblue" : "lightgrey"}`}
                                {...provided.droppableProps} ref={provided.innerRef}
                            >
                                {columns.map((column, index) => {
                                    return (<CardListPreview columnId={column.id} column={column} index={index} />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable >
                </DragDropContext>
                {/* <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)} >
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (<CardListPreview columnId={columnId} column={column} index={index}/>
                         );
                    })}
                </DragDropContext> */}

            </div>
        );
    }
}


{/* <div
    className={`card-col ${snapshot.isDraggingOver ? "lightblue" : "lightgrey"}`}
    {...provided.droppableProps}
    ref={provided.innerRef}
>
    {column.items.map((item, index) => {
        return (
            <CardPreview item={item} index={index} />
        );
    })}
    {provided.placeholder}
</div>
    );
}}
</Droppable >
</div >
 */}
