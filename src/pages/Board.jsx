import React, { Component } from "react";
import {CardDetails} from './CardDetails.jsx';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CardListPreview from '../cmps/CardListPreview.jsx'
import { AddListForm } from '../cmps/AddListForm.jsx'
import { connect } from 'react-redux';
import uuid from "uuid/v4";
import { setBoards, setBoard, saveBoard, removeBoard } from '../store/actions/boardActions.js'


class Board extends Component {


    getNewCard = (txt) => {
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
            text: txt,
            checkList: {},
            labels: [],
            comments: []
        }
    }


    getNewList = (title) => {
        //TODO get the creator from somewere
        return {
            id: uuid(),
            title: title,
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

    onAddList = (currBoardState, title = "") => {
        const currBoard = JSON.parse(JSON.stringify(currBoardState));
        const { cardLists } = currBoard;
        cardLists.push(this.getNewList(title));
        this.props.saveBoard(currBoard);
    }

    onAddCard = (currBoardState, listId, txt = "") => {
        const currBoard = JSON.parse(JSON.stringify(currBoardState));
        const { cardLists } = currBoard;
        const list = cardLists.find(cardList => cardList.id === listId);
        list.cards.push(this.getNewCard(txt))
        this.props.saveBoard(currBoard);
    }

    onDeleteCard = (cardId, cardListId, currBoardState, ev) => {
        ev.stopPropagation()
        const currBoard = JSON.parse(JSON.stringify(currBoardState))
        const { cardLists } = currBoard
        const list = cardLists.find(cardList => cardList.id === cardListId);
        const cardIdx = list.cards.findIndex(card => card.id === cardId);

        list.cards.splice(cardIdx, 1);
        this.props.saveBoard(currBoard);
    }

    onDeleteList = (currBoardState, listId, ev) => {
        ev.stopPropagation()
        const currBoard = JSON.parse(JSON.stringify(currBoardState))
        console.log(currBoard)
        const { cardLists } = currBoard
        console.log(cardLists)
        const listIdx = cardLists.findIndex(list => listId === list.id);

        cardLists.splice(listIdx, 1);
        this.props.saveBoard(currBoard);
    }

    onDragEnd = (result, currBoardState, setcurrBoard) => {
        if (!result.destination) return;

        const currBoard = JSON.parse(JSON.stringify(currBoardState))
        currBoard["chigiboom"] = 'chigiboom';
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
                this.props.saveBoard(currBoard);
                break;
        }
    };

    getBackground(board) {
        return board.background.content ? {
            backgroundImage: "url(" + `${board.background.content}` + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        } : { background: board.background.color }
    }

    render() {

        const { setcurrBoard, onDragEnd, onAddList, onAddCard, onDeleteList, onDeleteCard } = this;
        const { currBoard, history } = this.props;
        console.log('BOARD PROPS:', currBoard);
        const { cardId } = this.props.match.params;
        if (!currBoard) return <div>loading</div>;
        const { cardLists } = currBoard;

        return (
            <div className="board-app-container" style={this.getBackground(currBoard)} >
                <div className={`wrap-card-lists flex`}>
                    <DragDropContext onDragEnd={result => onDragEnd(result, currBoard, setcurrBoard)} >
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {(provided, snapshot) => (
                                <div className={`card-lists flex ${snapshot.isDraggingOver ? "light" : "light"}`}
                                    {...provided.droppableProps} ref={provided.innerRef}
                                >
                                    {cardLists.map((cardList, index) => {
                                        return (<CardListPreview currBoard={currBoard} onAddCard={onAddCard} cardListId={cardList.id} key={cardList.id} onDeleteCard={onDeleteCard} onDeleteList={onDeleteList} cardList={cardList} index={index} history={history} />
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <AddListForm onAddList={onAddList} currBoard={currBoard}/>

                    <div onClick={() => { onAddList(currBoard) }} className="card-list add-list" >Add List</div>
                </div >
                {cardId && <CardDetails history={history} currBoard={currBoard} cardId={cardId} />}
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
    removeBoard,
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
