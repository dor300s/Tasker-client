import React, { Component } from "react";
import CardDetails from './CardDetails.jsx';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CardListPreview from '../cmps/CardListPreview.jsx'
import { connect } from 'react-redux';
import uuid from "uuid/v4";
import { getBoards } from '../tempSeviceData/tempBoardData.js'
import { setBoards, setBoard, saveBoard, removeBoard/* , getBoard */ } from '../store/actions/boardActions.js'


// work ofline with localData

// const boards = getBoards()
// const currBoard = boards[0].cardLists


class Board extends Component {

    // state = {
    //     currBoard
    // };

    getNewCard = () => {
        //TODO get the creator from somewere

        return {
            id: uuid(),
            createdAt: Date.now(),
            creator: {},
            description: "",
            isStarred: false,
            dueDate: null,
            members: [
                {}
            ],
            covers: {
                id: "",
                imgUrl: "",
                isShown: true
            },
            attachments: [],
            text: "",
            checkList: {},
            labels: [],
            comments: []
        }
    }


    getNewList = () => {
        //TODO get the creator from somewere
        return {
            id: uuid(),
            title: "",
            createdAt: Date.now(),
            creator: {},
            cards: []
        }
    }

    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.setBoard(boardId);
        console.log(boardId)
    }

    setcurrBoard = (currBoard) => {
        this.setState({ currBoard })
    }

    onAddList = (currBoardState) => {
        //TODO add toalk with service
        const currBoard = JSON.parse(JSON.stringify(currBoardState));
        const { cardLists } = currBoard;
        cardLists.push(this.getNewList());
        //work until here
        this.props.saveBoard(currBoard);
    }

    onAddCard = (currBoardState, listId) => {
        //TODO add toalk with service
        const currBoard = JSON.parse(JSON.stringify(currBoardState));
        const { cardLists } = currBoard;
        const list = cardLists.find(cardList => cardList.id === listId);
        console.log(list)
        list.push(this.getNewCard())
        console.log(list)
        this.props.saveBoard(currBoard);
    }

    onDeleteCard(cardId, currBoardState) {
        //TODO add toalk with service
        const currBoard = JSON.parse(JSON.stringify(currBoardState))
        const { cards } = currBoard.cardLists

        const cardIdx = cards.findIndex(list => cardId === list.id);

        cards.splice(cardIdx, 1);
        this.props.saveBoard(currBoard);
    }

    onDeleteList(listId, currBoardState) {
        //TODO add toalk with service
        const currBoard = JSON.parse(JSON.stringify(currBoardState))
        const { cardLists } = currBoard
        const listIdx = cardLists.findIndex(list => listId === list.id);

        cardLists.splice(listIdx, 1);
        this.props.saveBoard(currBoard);
    }

    onDragEnd = (result, currBoardState, setcurrBoard) => {
        if (!result.destination) return;

        const currBoard = JSON.parse(JSON.stringify(currBoardState))
        const { cardLists } = currBoard

        const { source, destination, type } = result;

        switch (type) {
            case "card":
                const sourcecardList = cardLists.find(list => source.droppableId === list.id);
                const destcardList = cardLists.find(list => destination.droppableId === list.id);

                const sourcecards = sourcecardList.cards;
                const destcards = destcardList.cards;
                const [removed] = sourcecards.splice(source.index, 1);
                destcards.splice(destination.index, 0, removed);
                this.props.saveBoard(currBoard);

                break;
            case "list":
                const [removedList] = cardLists.splice(source.index, 1);
                cardLists.splice(destination.index, 0, removedList);
                this.props.saveBoard(currBoard)
                break;
        }
    };


    render() {

        const { setcurrBoard, onDragEnd, onAddList, onAddCard, onDeleteList, onDeleteCard } = this;
        const { currBoard } = this.props;
        console.log('BOARD PROPS:', currBoard);

        if (!currBoard) return <div>loading</div>;

        const { cardLists } = currBoard;

        return (

            <div className={`wrap-card-lists flex`} >
                <DragDropContext onDragEnd={result => onDragEnd(result, currBoard, setcurrBoard)} >
                    <Droppable droppableId={"all-currBoard"} direction="horizontal" type="list" >
                        {(provided, snapshot) => (
                            <div className={`card-lists flex ${snapshot.isDraggingOver ? "light" : "light"}`}
                                {...provided.droppableProps} ref={provided.innerRef}
                            >
                                {cardLists.map((cardList, index) => {
                                    return (<CardListPreview currBoard={currBoard} onAddCard={onAddCard} cardListId={cardList.id} key={cardList.id} onDeleteCard={onDeleteCard} onDeleteList={onDeleteList} cardList={cardList} index={index} />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <div onClick={() => { onAddList(currBoard) }} className="card-list" > +add list+  </div>
            </div >
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
    removeBoard,
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
