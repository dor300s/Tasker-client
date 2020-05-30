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
import CardLabels from '../cmps/CardLabels'

class CardDetails extends Component {


    state = {
        currCard: null,
        currList: null,
        isCalendarActive: false,
        isImagesShown: false,
        isMembersModalShown: false,
        isLabelsModalShown:false,
        isActionTodoActive: false

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
        console.log('OPEN CALENDAR');
        
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

    onCardTitle = ({target}) => {
        const {currCard} = this.state
        currCard.text = target.innerText
    }

    onTitleBlur = () =>{
        console.log('LUREDED');
        
        const { currBoard } = this.props
        this.props.saveBoard(currBoard)
    }
    onLabels = () => {
        this.setState(prevState => ({ isLabelsModalShown: !prevState.isLabelsModalShown }))
    }

    onTodoAction = () => {
        this.setState({ isActionTodoActive: true })
    }
    onAddTodo = () => {
        this.setState({ isActionTodoActive: false })
    }

    render() {

        const { currCard, currList, isCalendarActive, isImagesShown, isMembersModalShown , isLabelsModalShown , isActionTodoActive} = this.state
        const { currBoard , loggedUser } = this.props
        if (!currCard) return ''
        return (
            <React.Fragment>
                <div className="screen flex align-center justify-center" onClick={this.onCloseCardDetails}> </div>

                <div className="card-details-content-wrapper">
                    <div onClick={this.eventsHandler} className="card-details-modal">
                        <div className="card-details-header flex space-between align-center">
                            <div className="flex align-center">
                                <span className="card-icon"></span>
                                <p spellCheck={false} contentEditable={true} suppressContentEditableWarning={true} className="card-details-title" onBlur={this.onTitleBlur} onKeyUp={this.onCardTitle}>{currCard.text}</p>
                                <p className="card-list-parent">In list: <span>{currList.title}</span></p>
                            </div>
                            <span className="cancel" onClick={this.onCloseCardDetails}></span>
                        </div>

                        <div className="card-details-content-wrapper flex">
                            <div className="card-details-content flex column">
                                < CardLabels card={currCard} board={currBoard} isShown={isLabelsModalShown} />
                                < CardMembers user={loggedUser} history={this.props.history} card={currCard} board={currBoard}
                                    showModal={isMembersModalShown} />
                                {currCard.dueDate && < DueDate card={currCard} board={currBoard} />}
                                < CardDescription card={currCard} board={currBoard} />
                                {(currCard.checkList.length > 0 || isActionTodoActive) && < CardTodoList onAddTodo={this.onAddTodo} onActionTodo={isActionTodoActive} card={currCard} board={currBoard} user={this.props.loggedUser} />}
                                {isImagesShown &&  < CardAttachments card={currCard} board={currBoard} />}
                                < CardComments card={currCard} board={currBoard} user={this.props.loggedUser} />
                            </div>
                            < CardActions onTodoAction={this.onTodoAction} onLabels={this.onLabels} openDatePicker={this.openDatePicker} onImages={this.onImages} onMembers={this.onMembers} />
                            < CardCalendar card={currCard} onDatePicked={this.onDatePicked} isShown={isCalendarActive} />
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