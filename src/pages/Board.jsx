import React, { Component } from "react";
import CardDetails from './CardDetails.jsx';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CardListPreview from '../cmps/CardListPreview.jsx'
import { AddListForm } from '../cmps/AddListForm.jsx'
import { connect } from 'react-redux';
import uuid from "uuid/v4";
import { setBoards, setBoard, saveBoard, removeBoard } from '../store/actions/boardActions.js'
import socketService from '../services/socketService'

class Board extends Component {

    /* state = {
        currBoard: null
    } */

    getNewCard = (txt) => {

        return {
            id: uuid(),
            createdAt: Date.now(),
            creator: {},
            description: "",
            isStarred: false,
            dueDate: null,
            members: [
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
        return {
            id: uuid(),
            title: title,
            createdAt: Date.now(),
            creator: null,
            cards: []
        }
    }

    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.setBoard(boardId)

        socketService.on(`board-updated-${boardId}`, (id) => {
            console.log('SOCKETTTTTTTT');
            this.props.setBoard(id)
        })
    }

<<<<<<< HEAD
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currBoard !== this.props.currBoard) {
            console.log('BOBOOOOOOOOOOOOOO');
            // socketService.emit('board updated', this.props.currBoard._id)
        }
=======
    componentWillUnmount() {
        const { boardId } = this.props.match.params
        socketService.off(`board-updated-${boardId}`)
>>>>>>> 9646f2bf422e5ab4e544377bb4be95ec81d66066
    }
    // componentDidUpdate(prevProps, prevState) {
    //     // only update chart if the data has changed
    //     if (prevProps.data !== this.props.data) {
    //         this.chart = c3.load({
    //             data: this.props.data
    //         });
    //     }
    // }
    // socketService.emit('board updated', currBoard._id)




    /*  componentDidUpdate(prevProps) {
         const { currBoard } = this.props
         if (prevProps.currBoard !== this.props.currBoard) {
             socketService.emit('board updated', currBoard._id)
             console.log('BOARD UPDATEDDDDDDDDDDDDDDDDD');
         }
     } */

    onAddList = (title = "") => {
        const { currBoard } = this.props
        const { cardLists } = currBoard;
        cardLists.push(this.getNewList(title));
        this.props.saveBoard(currBoard)
            .then(() => socketService.emit('board updated', currBoard._id));
    }

    onAddCard = (ListId, txt = "") => {
        console.log("listId", ListId)
        console.log("txt", txt)
        const { currBoard } = this.props
        const { cardLists } = currBoard;
        const list = cardLists.find(cardList => cardList.id === ListId);
        list.cards.push(this.getNewCard(txt))
        console.log(currBoard)
        this.props.saveBoard(currBoard)
            .then(() => socketService.emit('board updated', currBoard._id));

    }

    onDeleteCard = (cardId, cardListId, ev) => {
        ev.stopPropagation()
        const { currBoard } = this.props
        const { cardLists } = currBoard;
        const list = cardLists.find(cardList => cardList.id === cardListId);
        const cardIdx = list.cards.findIndex(card => card.id === cardId);

        list.cards.splice(cardIdx, 1);
        this.props.saveBoard(currBoard)
            .then(() => socketService.emit('board updated', currBoard._id));
    }

    onDeleteList = (listId, ev) => {
        ev.stopPropagation()
        const { currBoard } = this.props
        const { cardLists } = currBoard;
        console.log(cardLists)
        const listIdx = cardLists.findIndex(list => listId === list.id);

        cardLists.splice(listIdx, 1);
        this.props.saveBoard(currBoard)
            .then(() => socketService.emit('board updated', currBoard._id));
    }

    onDragEnd = (result) => {
        if (!result.destination) return;
        const { currBoard } = this.props
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
                this.props.saveBoard(currBoard)
                    .then(() => socketService.emit('board updated', currBoard._id));
                break;

            case "list":
                const [removedList] = cardLists.splice(source.index, 1);
                cardLists.splice(destination.index, 0, removedList);
                this.props.saveBoard(currBoard)
                    .then(() => socketService.emit('board updated', currBoard._id));
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


        const { cardId } = this.props.match.params;
        if (!currBoard) return <div>loading</div>;
        const { cardLists } = currBoard;

        return (
            <div className="board-app-container" style={this.getBackground(currBoard)} >
                <div className={`wrap-card-lists flex`}>
                    <DragDropContext onDragEnd={result => onDragEnd(result)} >
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

                    <AddListForm onAddList={onAddList} />
                </div >
                {cardId && <CardDetails currBoard={currBoard} history={history} cardId={cardId} />}
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
