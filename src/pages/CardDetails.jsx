import React, { Component } from 'react'
import {CardActions} from '../cmps/CardActions'
import {CardComments} from '../cmps/CardComments'
import CardDescription from '../cmps/CardDescription'
import CardMembers from '../cmps/CardMembers'
export class CardDetails extends Component {

    state = {
        currCard: null,
        currList: null
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

        this.setState({ currCard, currList }, () => console.log('Card', this.state.currCard, currList))
    }

    render() {
        const { currCard, currList } = this.state
        const { currBoard } = this.props
        if (!currCard) return ''
        return (
            <div className="screen flex align-center justify-center">
                <div className="card-details-modal">
                    <div className="card-details-header flex space-between">
                        <div className="flex align-center">
                            <span className="card-icon"></span>
                            <p className="card-details-title">{currCard.text}</p>
                            {/* <p>In list: {currList.title}</p> */}
                        </div>
                        <button className="card-details-close">X</button>
                    </div>

                <div className="card-details-content-wrapper flex">
                    <div className="card-details-content flex column">
                    <CardMembers history={this.props.history} card={currCard} board={currBoard} />
                    < CardDescription card={currCard} board={currBoard} />
                    < CardComments />
                    </div>
                    < CardActions />
                </div>

                </div>
            </div>
        )
    }
}
