import React, { Component } from 'react'
import { connect } from 'react-redux'
import {saveBoard} from '../store/actions/boardActions'

class CardMembers extends Component {
    render() {
        const {card , history} = this.props
        return (
            <div className="card-members flex align-center">
            <button className="card-member-invite" >Invite</button>

            {card.members.map((member, idx) => {
                if (member.imgUrl) {
                    return <div key={idx} className="card-member" style={{
                        backgroundImage: "url(" + `${member.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} onClick={() => history.push(`/user/${member._id}`)}>
                        <div className="card-member-tooltip">
                            <p>{member.userName}</p>
                        </div>
                    </div>

                }
                else {
                    return <h3 className="nav-user-profile flex justify-center align-center">{member.userName.charAt(0)}</h3>
                }
            })}
        </div>
        )
    }
}
const mapDispatchToProps = {
    saveBoard
}

export default connect(null, mapDispatchToProps)(CardMembers)