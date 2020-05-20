import React, { Component, useState } from "react";
import CardDetails from './CardDetails.jsx';
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import initialData from '../tempSeviceData/list-initial-data.js'
import Column from '../cmps/Column'
import uuid from "uuid/v4";


// export default class Board extends Component {
//     state = initialData;


//     onDragStart = () => {

//     }

//     onDragUpdate = () => {

//     }

//     onDragEnd = result => {
//         //TODO: reorder our column        
//     }

//     render() {
//         return (
//             <DragDropContext 
//                 onDragStart={this.onDragStart} 
//                 onDragUpdate={this.onDragUpdate} 
//                 onDragEnd={this.onDragEnd}
//             >
//             {this.state.columnOrder.map(columnId => {
//             const column = this.state.columns[columnId];
//             const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

//             return <Column key={column.id} column={column} tasks={tasks} />

//         })}
//             </DragDropContext>
//         )
//     }
// }












// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));


// a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle
// });

// const getListStyle = isDraggingOver => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250
// });

// export default class Board extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: getItems(10)
//     };
//     this.onDragEnd = this.onDragEnd.bind(this);
//   }

//   onDragEnd(result) {
//     // dropped outside the list
//     if (!result.destination) {
//       return;
//     }

//     const items = reorder(
//       this.state.items,
//       result.source.index,
//       result.destination.index
//     );


//     this.setState({
//       items
//     }, () => console.log(result));
//   }

//   // Normally you would want to split things out into separate components.
//   // But in this example everything is just done in one place for simplicity
//   render() {

//     console.log(this.state)


//     return (
//       <div className="flex space-between">
//         <DragDropContext  onDragEnd={this.onDragEnd}>
//           <Droppable  droppableId="droppable0">
//             {(provided, snapshot) => (
//               <div
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 style={getListStyle(snapshot.isDraggingOver)}
//               >
//                 {this.state.items.map((item, index) => (
//                   <Draggable key={item.id + 200} draggableId={item.id +200} index={index}>
//                     {(provided, snapshot) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         style={getItemStyle(
//                           snapshot.isDragging,
//                           provided.draggableProps.style
//                         )}
//                       >
//                         {item.content}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           <Droppable droppableId="droppable1">
//             {(provided, snapshot) => (
//               <div
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 style={getListStyle(snapshot.isDraggingOver)}
//               >
//                 {this.state.items.map((item, index) => (
//                   <Draggable key={item.id} draggableId={item.id} index={index}>
//                     {(provided, snapshot) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         style={getItemStyle(
//                           snapshot.isDragging,
//                           provided.draggableProps.style
//                         )}
//                       >
//                         {item.content}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>
//     )
//   }
// }

// // Put the thing into the DOM!
// // ReactDOM.render(<App />, document.getElementById("root"));




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

    // const [columns, setColumns] = useState(columnsFromBackend);;

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
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                                key={columnId}
                            >
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
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        );
    }
}

