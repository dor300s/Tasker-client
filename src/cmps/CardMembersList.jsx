import React from 'react'
export function CardMembersList(props) {
    const { board, card, opacity  } = props
    return (
        <div className={`add-card-member-modal ${opacity} flex align-center`}>
            <div className="nav-board-members flex align-center">

                {board.members.map((member, idx) => {
                    let dynamicClass = ''
                    if (idx === 0) dynamicClass = 'first-member'
                    let letUserIdx = card.members.findIndex(user => user._id === member._id)
                    if (member.imgUrl) {
                        return <div key={idx} className="flex column align-center">
                            {letUserIdx !== -1 && <div style={{marginLeft: `${!idx? '' : '-2px'}`}} className="member-overlay"> </div>}
                            <div  className={dynamicClass + " " + "board-member"} style={{
                                backgroundImage: "url(" + `${member.imgUrl}` + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }} onClick={() => props.addMember(member)}>
                                <div className="board-member-tooltip">
                                    <p>{member.fullName}</p>
                                </div>
                            </div>
                        </div>
                    }
                    else {
                        return <h3 onClick={() => props.addMember(member)} className="card-user-profile flex justify-center align-center">{member.fullName.charAt(0)}</h3>
                    }
                })}
            </div>
        </div>
    )
}
