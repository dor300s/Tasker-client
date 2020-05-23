import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { CardActions } from '../cmps/CardActions'
import { CardComments } from '../cmps/CardComments'
import CardDescription from '../cmps/CardDescription'
import CardMembers from '../cmps/CardMembers'
import CardCalendar from '../cmps/CardCalendar'
import {DueDate} from '../cmps/DueDate'

export class CardDetails extends Component {

    
    state = {
        currCard: null,
        currList: null,
        isCalendarActive: false,
        dueDate: null
    }
  
    eventsHandler = (ev) => {
        console.log(ev);
        ev.stopPropagation();
    }

    componentDidMount() {
        this.getCurrCard()
    }

    getCurrCard = () => {
        const { cardId, currBoard } = this.props
        let currCard;
        let currList
        currBoard.cardLists.forEach(cardList => {
            cardList.cards.forEach(card => {
                if (card.id === cardId) {
                    currCard = card;
                    currList = cardList;
                }
            })
        })
        this.setState({ currCard, currList })
    }

    openDatePicker = () => {
        this.setState(prevState => ({ isCalendarActive: !prevState.isCalendarActive }))
    }

    onDatePicked = (date) => {
        this.setState({dueDate: date , isCalendarActive:false})
    }

    onCloseCardDetails = () => {
        const { currBoard } = this.props
        this.props.history.push(`/board/${currBoard._id}`)
    }

    render() {
        const { currCard, currList , isCalendarActive , dueDate} = this.state
        const { currBoard } = this.props
        if (!currCard) return ''
        return (
            <div className="screen flex align-center justify-center" onClick={this.onCloseCardDetails}>
                <div onClick={this.eventsHandler} className="card-details-modal">
                    <div className="card-details-header flex space-between">
                        <div className="flex align-center">
                            <span className="card-icon"></span>
                            <p className="card-details-title">{currCard.text}</p>
                            {/* <p>In list: {currList.title}</p> */}
                        </div>
                        <button className="card-details-close" onClick={this.onCloseCardDetails}>X</button>
                    </div>

                    <div className="card-details-content-wrapper flex">
                        <div className="card-details-content flex column">
                            < CardMembers history={this.props.history} card={currCard} board={currBoard} />
                            < CardDescription card={currCard} board={currBoard} />
                            < DueDate date={'MAY-24'} /> 
                            < CardComments />
                        </div>
                        < CardActions openDatePicker={this.openDatePicker} />
                        {isCalendarActive && < CardCalendar card={currCard} onDatePicked={this.onDatePicked} />}

                    </div>

                </div>
            </div>
        )
    }
}
