import React from 'react'
export function CardMembersList(props) {
    const { board, history } = props

    return (
        <div className="add-card-member-modal flex align-center">
            <div className="nav-board-members flex align-center">

                {board.members.map((member, idx) => {
                    if (member.imgUrl) {
                        return <div key={idx} className="board-member" style={{
                            backgroundImage: "url(" + `${member.imgUrl}` + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }} onClick={() => props.addMember(member)}>
                            <div className="board-member-tooltip">
                                <p>{member.fullName}</p>
                            </div>
                        </div>
                    }
                    else {
                        // return <h3 onClick={() => props.addMember(member)} className="card-user-profile flex justify-center align-center">{member.userName.charAt(0)}</h3>
                    }
                })}
            </div>
        </div>
    )
}
