import React, { Component } from "react";
import CardDetails from './CardDetails.jsx';
import ReactDOM from "react-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from '../tempSeviceData/list-initial-data.js'
import CardListPreview from '../cmps/CardListPreview.jsx'
import uuid from "uuid/v4";
import { getBoards } from '../tempSeviceData/tempBoardData.js'


const cardsFromBackend = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second task" },
    { id: uuid(), content: "Third task" },
    { id: uuid(), content: "Fourth task" },
    { id: uuid(), content: "Fifth task" }
];


const cardLists = [
    {
        id: uuid(),
        name: "Requested",
        cards: cardsFromBackend
    },
    {
        id: uuid(),
        name: "Todo",
        cards: []
    },
    {
        id: uuid(),
        name: "Done",
        cards: []
    },
    {
        id: uuid(),
        name: "Archive",
        cards: []
    },
];

// const boards = getBoards()
// const { cardLists } = boards

export default class Board extends Component {

    state = {
        cardLists
    };

    setcardLists = (cardLists) => {
        this.setState({ cardLists })
    }

    onDragEnd = (result, statecardLists, setcardLists) => {
        const cardLists = JSON.parse(JSON.stringify(statecardLists))
        console.log(result)
        if (!result.destination) return;
        const { source, destination, type } = result;

        switch (type) {
            case "card":
                const sourceColumn = cardLists.find(column => source.droppableId === column.id);
                const destColumn = cardLists.find(column => destination.droppableId === column.id);

                const sourcecards = sourceColumn.cards;
                const destcards = destColumn.cards;
                const [removed] = sourcecards.splice(source.index, 1);
                destcards.splice(destination.index, 0, removed);
                setcardLists(cardLists);
                break;
            case "list":
                const [ removedList ] = cardLists.splice(source.index, 1);
                console.log("cardLists", cardLists)
                console.log("removeList", removedList)
                console.log(removedList)
                cardLists.splice(destination.index , 0, removedList);
                setcardLists(cardLists);
                break;
        }


    };

    render() {


        const { setcardLists, onDragEnd } = this;
        const { cardLists } = this.state;



        return (
            <div /* style={{ display: "flex", justifyContent: "center", height: "100%" }} */>
                <DragDropContext onDragEnd={result => onDragEnd(result, cardLists, setcardLists)} >
                    <Droppable droppableId={"all-cardLists"} direction="horizontal" type="list" >
                        {(provided, snapshot) => (
                            <div className={`card-col flex ${snapshot.isDraggingOver ? "light" : "light"}`}
                                {...provided.droppableProps} ref={provided.innerRef}
                            >
                                {cardLists.map((column, index) => {
                                    return (<CardListPreview columnId={column.id} column={column} index={index} />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable >
                </DragDropContext>

            </div>
        );
    }
}
