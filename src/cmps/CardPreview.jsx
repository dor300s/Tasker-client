import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardIconsPreview } from './CardIconsPreview.jsx'
import { CardLabelsPreview } from './CardLabelsPreview.jsx'
import { CardHeaderForm } from './CardHeaderForm.jsx'
import { CardMenu } from './CardMenu.jsx'


export default class CardPreview extends Component {
    
    state = {
        isFocus: false,
    }

    onEditCardHeader = (ev) => {
        ev.stopPropagation();
        this.setState({ isFocus: true })
    }
    
    offEditCardHeader = (cardId, listId, text) => {
        console.log("listId", listId)
        console.log("txt", text)
        const currBoard = JSON.parse(JSON.stringify(this.props.currBoard));
        const { cardLists } = currBoard;
        const list = cardLists.find(cardList => cardList.id === listId);
        const card = list.find(card => card.id === cardId)
        card.text = text
        this.props.saveBoard(currBoard);
        this.setState({ isFocus: false })
        this.props.saveBoard()
    }


    showCard = (cardId, history, currBoard) => {
        history.push(`/board/${currBoard._id}/${cardId}`)
    };
  
    render() {

        const { index, card, currBoard, cardListId, history } = this.props
        const { showCard, offEditCardHeader, onEditCardHeader } = this;
        return (
            <Draggable key={card.id} draggableId={card.id} index={index} >
                {(provided, snapshot) => {
                    return (
                        <>
                            <div
                                className={`card-preview drag ${snapshot.isDragging ? "isDragging" : ""}`} onClick={() => showCard(card.id, history, currBoard)}
                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                style={{
                                    userSelect: "none",
                                    ...provided.draggableProps.style
                                }}
                            >
                                <div className="top-icons flex space-between">
                                    {Boolean(card.labels.length) && <CardLabelsPreview histoy={history} labels={card.labels} />}

                                    <div className="menu-btn" onClick={this.openMenu}>
                                     <CardMenu cardId={card.id} cardListId={cardListId} />
                                    </div>
                                </div>
                                {(this.state.isFocus) ? <CardHeaderForm cardListId={cardListId} cardId={card.id} offEditCardHeader={offEditCardHeader} /> : card.text}
                                <CardIconsPreview card={card} />
                            </div>
                        </>
                    );
                }}
            </Draggable>
        )
    }
}
