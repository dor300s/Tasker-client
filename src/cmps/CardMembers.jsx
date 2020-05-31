import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard, setBoard } from '../store/actions/boardActions'
import { CardMembersList } from './CardMembersList'
import socketService from '../services/socketService'

class CardMembers extends Component {

    state = {
        isAddMemberActive: false,
        isMouseHoverUser: false
    }


    onAddMember = () => {
        this.setState(prevState => ({ isAddMemberActive: !prevState.isAddMemberActive }))
    }


    addMember = (member) => {
        
        const { card, board , user } = this.props
        let idx = card.members.findIndex(user => user._id === member._id)
        if (idx !== -1) return

        card.members.push(member)
        this.props.saveBoard(board)
        this.props.setBoard(board._id)
        let data = {
            assignedUserId: member._id,
            assingedBy: user.userName,
            cardId: card.id,
            boardId: board._id
        }
        socketService.emit('user card assign', data);
    }

    onMouseEnter = () => {
        this.setState({ isMouseHoverUser: true })
    }

    onMouseLeave = () => {
        this.setState({ isMouseHoverUser: false })
    }

    onRemoveCardUser = (idx, ev) => {
        ev.stopPropagation()
        const { card, board } = this.props
        card.members.splice(idx, 1)
        this.props.saveBoard(board)
    }

    render() {
        const { card, history, board , showModal} = this.props
        const { isAddMemberActive, isMouseHoverUser } = this.state
        
        return (
            <div style={{ marginBottom: "30px", marginLeft: "42px" }} className="flex column">
                <h4 className="card-members-header">Card members</h4>
                <div className="card-members flex align-center">
                    {<CardMembersList opacity={(isAddMemberActive || showModal) ? 'opacity-one' : ''} card={card} board={board} history={history} addMember={this.addMember} />}
                    <button className={`card-member-invite '}`} onClick={this.onAddMember}
                    // ${!isAddMemberActive && 'margin-right-26
                        style={{ backgroundColor: `${isAddMemberActive ? "rgba(110, 253, 141, 0.432)" : "rgba(142, 176, 248, 0.267)"}` }}>
                        {isAddMemberActive ? 'Done' : '+Add'}</button>
                    {card.members.map((member, idx) => {
                        if (member.imgUrl) {
                            return <div key={idx} className="profile-tooltip-wraper" >
                                <div className="card-member" style={{
                                    backgroundImage: "url(" + `${member.imgUrl}` + ")",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }} onClick={() => history.push(`/user/${member._id}`)} onMouseEnter={this.onMouseEnter}
                                    onMouseLeave={this.onMouseLeave}>

                                    {isMouseHoverUser && <button onClick={(ev) => this.onRemoveCardUser(idx, ev)} className="card-member-remove"></button>}
                                </div>
                                <div className="card-member-tooltip">
                                    <p>{member.fullName}</p>
                                </div>
                            </div>
                        }
                        else {
                            return <><h3 className="card-user-profile flex justify-center align-center"onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}> {member.fullName.charAt(0)}</h3>
                            {isMouseHoverUser && <button onClick={(ev) => this.onRemoveCardUser(idx, ev)} className="card-member-remove"></button>}
                                <div className="card-member-tooltip">
                                    <p>{member.fullName}</p>
                                </div>
                            </>
                        }
                    })}
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = {
    saveBoard,
    setBoard
}

export default connect(null, mapDispatchToProps)(CardMembers)