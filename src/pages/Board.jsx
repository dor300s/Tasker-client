import React, { Component } from "react";
import CardDetails from './CardDetails.jsx';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CardListPreview from '../cmps/CardListPreview.jsx'
import { AddListForm } from '../cmps/AddListForm.jsx'
import { connect } from 'react-redux';
import uuid from "uuid/v4";
import { clearCurrBoard, setBoards, setBoard, saveBoard, removeBoard } from '../store/actions/boardActions.js'
import socketService from '../services/socketService'


class Board extends Component {

    state = {
        animation: 'animation'
    }

    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.setBoard(boardId)

        socketService.on(`board-updated-${boardId}`, (id) => {
            this.setState({ animation: 'animation' })
            this.props.setBoard(id)
        })
    }


    componentWillUnmount() {
        const { boardId } = this.props.match.params
        socketService.off(`board-updated-${boardId}`)
        this.props.clearCurrBoard()
    }

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
            checkList: [],
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

    onAddList = async (title = "") => {
        this.setState({ animation: 'animation' })
        const { currBoard } = this.props
        const { cardLists } = currBoard;
        cardLists.push(this.getNewList(title));
        await this.props.saveBoard(currBoard)
        window.scrollTo(100000, 0)
    }

    onAddCard = async (ListId, txt = "") => {
        this.setState({ animation: 'animation' })
        console.log("listId", ListId)
        console.log("txt", txt)
        const { currBoard } = this.props
        const { cardLists } = currBoard;
        const list = cardLists.find(cardList => cardList.id === ListId);
        console.log('list', list)
        list.cards.push(this.getNewCard(txt))
        console.log(currBoard)
        await this.props.saveBoard(currBoard)
    }

    onDragEnd = (result) => {
        this.setState({ animation: '' })
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
                break;

            case "list":
                const [removedList] = cardLists.splice(source.index, 1);
                cardLists.splice(destination.index, 0, removedList);
                this.props.saveBoard(currBoard)
                break;

            default:
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

        const { onDragEnd, onAddList, onAddCard } = this;
        const { currBoard, history } = this.props;
        const { animation } = this.state;

        const { cardId } = this.props.match.params;
        if (!currBoard) return <div>loading</div>;
        const { cardLists } = currBoard;


        return (
            <div className="board-app-container"  >
                <div className="board-background" style={this.getBackground(currBoard)}></div>
                <div className={`wrap-card-lists flex`} >
                    <DragDropContext onDragEnd={result => onDragEnd(result)} >
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {(provided, snapshot) => (
                                <div className={`card-lists flex ${snapshot.isDraggingOver ? "light" : ""}`}
                                    {...provided.droppableProps} ref={provided.innerRef}
                                >
                                    {cardLists.map((cardList, index) => {
                                        return (<CardListPreview currBoard={currBoard} onAddCard={onAddCard} key={cardList.id} cardList={cardList} index={index} history={history} animation={animation} />
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
    clearCurrBoard,
    removeBoard,
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
