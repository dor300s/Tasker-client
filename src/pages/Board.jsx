import React, { Component } from "react";
import CardDetails from './CardDetails.jsx';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CardListPreview from '../cmps/CardListPreview.jsx'
import { connect } from 'react-redux';
import uuid from "uuid/v4";
import { getBoards } from '../tempSeviceData/tempBoardData.js'
import { setBoards, setBoard, saveBoard, removeBoard/* , getBoard */ } from '../store/actions/boardActions.js'


// work ofline with localData

const boards = getBoards()
const currBoard = boards[0].cardLists


class Board extends Component {

    state = {
        currBoard
    };

    componentDidMount() {
        const { boardId } = this.props.match.params
        // this.props.getBoard(boardId);
        console.log(boardId)
    }

    setcurrBoard = (currBoard) => {

        this.setState({ currBoard })
    }

    onDragEnd = (result, statecurrBoard, setcurrBoard) => {
        const currBoard = JSON.parse(JSON.stringify(statecurrBoard))
        console.log(result)
        if (!result.destination) return;
        const { source, destination, type } = result;

        switch (type) {
            case "card":
                const sourceColumn = currBoard.find(column => source.droppableId === column.id);
                const destColumn = currBoard.find(column => destination.droppableId === column.id);

                const sourcecards = sourceColumn.cards;
                const destcards = destColumn.cards;
                const [removed] = sourcecards.splice(source.index, 1);
                destcards.splice(destination.index, 0, removed);
                setcurrBoard(currBoard);
                break;
            case "list":
                const [removedList] = currBoard.splice(source.index, 1);
                currBoard.splice(destination.index, 0, removedList);
                setcurrBoard(currBoard);
                break;
        }


    };

    render() {


        const { setcurrBoard, onDragEnd } = this;
        const { currBoard } = this.state



        return (
            <div /* style={{ display: "flex", justifyContent: "center", height: "100%" }} */>
                <DragDropContext onDragEnd={result => onDragEnd(result, currBoard, setcurrBoard)} >
                    <Droppable droppableId={"all-currBoard"} direction="horizontal" type="list" >
                        {(provided, snapshot) => (
                            <div className={`card-col flex ${snapshot.isDraggingOver ? "light" : "light"}`}
                                {...provided.droppableProps} ref={provided.innerRef}
                            >
                                {currBoard.map((column, index) => {
                                    return (<CardListPreview columnId={column.id} key={column.id} column={column} index={index} />
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


const mapStateToProps = (state) => {
    return {
        currBoard: state.boardApp.currBoard
    }
}
const mapDispatchToProps = {
    setBoards,
    setBoard,
    saveBoard,
    removeBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
