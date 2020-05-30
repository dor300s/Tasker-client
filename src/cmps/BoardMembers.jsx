import React from 'react'

export function BoardMembers(props) {
    const { board, history, cardMemberMode } = props

    return (
        <div className="nav-board-members flex align-center">

            {board.members.map((member, idx) => {
                
                if (member.imgUrl) {
                    return <div key={idx} className="board-member" style={{
                        backgroundImage: "url(" + `${member.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} onClick={() => history.push(`/user/${member._id}`)}>
                        <div className="board-member-tooltip">
                            <p>{member.fullName}</p>
                        </div>
                    </div>

                }
                else {
                    return <h3 className="nav-user-profile flex justify-center align-center">{member.fullName.charAt(0)}</h3>
                }
            })}
            {!cardMemberMode && <button className="nav-user-profile invite flex align-center justify-center index-1" onClick={() => props.onInvite()}><div className="plus-white flex align-center justify-center"></div></button>}
        </div>
    )
}
