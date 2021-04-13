import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CardPreview from './CardPreview.jsx'
import { AddCardForm } from "./AddCardForm.jsx";
import ListMenu from "./ListMenu.jsx"
import { ListTitleForm } from "./ListTitleForm.jsx"
import { connect } from 'react-redux';
import { saveBoard } from '../store/actions/boardActions.js'


class CardListPreview extends Component {

    state = {
        addlistForm: false,
        newlistTitle: '',
        isFocus: false,
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }


    onEditListTitle = (ev) => {
        ev.stopPropagation();
        this.setState({ isFocus: true })
    }

    offEditListTitle = (cardListId, title) => {
        if (!cardListId) {
            this.setState({ isFocus: false })
            return
        };

        const currBoard = this.props.currBoard;
        const { cardLists } = currBoard;
        const list = cardLists.find(cardList => cardList.id === cardListId);
        list.title = title;
        this.props.saveBoard(currBoard);
        this.setState({ isFocus: false })
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState({ addlistForm: false, newlistTitle: '' })
        }
    }

    openForm = () => {
        this.setState({ addlistForm: true });
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        this.setState({ newlistTitle: value })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.createNewlist();
    }

    handleBlur = () => {
        if (this.state.newlistTitle) this.createNewlist();
        else this.setState({ addlistForm: false });
    }

    createNewlist() {
        const list = { title: this.state.newlistTitle }
        this.props.onAddList(list)
        this.setState({ addlistForm: false, newlistTitle: '' })
    }


    render() {
        const { cardList, index, onAddCard, currBoard, history, animation } = this.props

        const { onEditListTitle, offEditListTitle } = this

        return (
            <Draggable key={cardList.id} draggableId={cardList.id} index={index} >
                {(provided, snapshot) => (
                    <div className={`wrap-card-list flex ${animation}`} key={cardList.id}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Droppable droppableId={cardList.id} key={cardList.id} type={"card"}>
                            {(provided, snapshot) => (
                                <div className={`card-list-container flex column ${snapshot.isDraggingOver ? "light" : ""}`} >
                                    <div className="title-content flex space-between ">
                                        {(this.state.isFocus) ? <ListTitleForm listTitle={cardList.title} cardList={cardList} offEditListTitle={offEditListTitle} /> : <h2 className="list-title">{cardList.title}</h2>}

                                        <ListMenu onEditListTitle={onEditListTitle} cardListId={cardList.id} />
                                    </div>
                                    <div className={"card-list"} {...provided.droppableprops} ref={provided.innerRef} >
                                        {cardList.cards.map((card, index) => {
                                            return (
                                                <CardPreview key={card.id} cardListId={cardList.id} currBoard={currBoard} card={card} index={index} history={history} animation={animation} />
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                    <AddCardForm onAddCard={onAddCard} cardList={cardList} cardListId={cardList.id} />
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currBoard: state.boardApp.currBoard
    }
}
const mapDispatchToProps = {
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(CardListPreview)