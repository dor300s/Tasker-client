import React, { Component } from 'react'
import { CardActions } from '../cmps/CardActions'
import CardComments from '../cmps/CardComments'
import CardDescription from '../cmps/CardDescription'
import CardMembers from '../cmps/CardMembers'
import CardCalendar from '../cmps/CardCalendar'
import  DueDate  from '../cmps/DueDate'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'
import CardAttachments from '../cmps/CardAttachments'
import InterActiveRobot from '../cmps/InterActiveRobot'
import CardTodoList from '../cmps/CardTodoList'

class CardDetails extends Component {


    state = {
        currCard: null,
        currList: null,
        isCalendarActive: false,
        isImagesShown: false,
        isMembersModalShown: false

    }

    eventsHandler = (ev) => {
        ev.stopPropagation();
    }

    componentDidMount() {
        this.getCurrCard()
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) this.getCurrCard()
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
        this.setState({ currCard, currList },()=> {
            if(currCard.attachments.length) this.setState({isImagesShown: true})
            else if(!currCard.attachments.length) this.setState({isImagesShown: false})
        })
    }

    openDatePicker = () => {
        this.setState(prevState => ({ isCalendarActive: !prevState.isCalendarActive }))
    }

    onImages = () => {
        this.setState(prevState => ({ isImagesShown: !prevState.isImagesShown }))
    }

    onMembers = () => {
        this.setState(prevState => ({ isMembersModalShown: !prevState.isMembersModalShown }))
    }

    onDatePicked = (timeStamp) => {
        const { currCard } = this.state
        const { currBoard } = this.props
        currCard.dueDate = timeStamp
        this.setState({ isCalendarActive: false })
        this.props.saveBoard(currBoard)
    }

    onCloseCardDetails = () => {
        const { currBoard } = this.props
        this.props.history.push(`/board/${currBoard._id}`)
    }

    render() {

        const { currCard, currList, isCalendarActive, isImagesShown, isMembersModalShown } = this.state
        const { currBoard } = this.props
        if (!currCard) return ''
        return (
            <React.Fragment>
                <div className="screen flex align-center justify-center" onClick={this.onCloseCardDetails}> </div>

                <div className="card-details-content-wrapper">
                    <div onClick={this.eventsHandler} className="card-details-modal">
                        <div className="card-details-header flex space-between align-center">
                            <div className="flex align-center">
                                <span className="card-icon"></span>
                                <p className="card-details-title">{currCard.text}</p>
                                <p className="card-list-parent">In list: <span>{currList.title}</span></p>
                            </div>
                            <span className="cancel" onClick={this.onCloseCardDetails}></span>
                        </div>

                        <div className="card-details-content-wrapper flex">
                            <div className="card-details-content flex column">
                                < CardMembers history={this.props.history} card={currCard} board={currBoard}
                                    showModal={isMembersModalShown} />
                                {currCard.dueDate && < DueDate card={currCard} board={currBoard} />}
                                < CardDescription card={currCard} board={currBoard} />
                                < CardTodoList card={currCard} board={currBoard} user={this.props.loggedUser} />
                                {isImagesShown &&  < CardAttachments card={currCard} board={currBoard} />}
                                < CardComments card={currCard} board={currBoard} user={this.props.loggedUser} />
                            </div>
                            < CardActions openDatePicker={this.openDatePicker} onImages={this.onImages} onMembers={this.onMembers} />
                            {isCalendarActive && < CardCalendar card={currCard} onDatePicked={this.onDatePicked} />}
                            {/* < InterActiveRobot user={this.props.loggedUser} /> */}

                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loggedUser: state.user.loggedInUser,
    }
}

const mapDispatchToProps = {
    saveBoard,
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails)