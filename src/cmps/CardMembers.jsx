import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'
import { CardMembersList } from './CardMembersList'

class CardMembers extends Component {

    state ={
        isAddMemberActive: false
    }

    onAddMember = () => {
        this.setState(prevState => ({ isAddMemberActive: !prevState.isAddMemberActive }))
    }

    addMember = (member) =>{
        const { card , board } = this.props
        card.members.push(member)
        this.props.saveBoard(board)
    }

    render() {
        const { card, history , board } = this.props
        const { isAddMemberActive } = this.state
        return (
            <div style={{marginBottom:"15px" , marginLeft:"50px"}} className="flex column">
                <h4 className="card-members-header">Card members</h4>
                <div className="card-members flex align-center">
                    {isAddMemberActive && <CardMembersList board={board} history={history} addMember={this.addMember} />}
                    <button className="card-member-invite" onClick={this.onAddMember}>+</button>
                    {card.members.userName && card.members.map((member, idx) => {
                        if (member.imgUrl) {
                            return <div key={idx} className="card-member" style={{
                                backgroundImage: "url(" + `${member.imgUrl}` + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }} onClick={() => history.push(`/user/${member._id}`)}>
                                <div className="card-member-tooltip">
                                    <p>{member.fullName}</p>
                                </div>
                            </div>

                        }
                        else {
                            return <h3 className="nav-user-profile flex justify-center align-center">{member.userName.charAt(0)}</h3>
                        }
                    })}
                </div>

            </div>
        )
    }
}
const mapDispatchToProps = {
    saveBoard
}

export default connect(null, mapDispatchToProps)(CardMembers)