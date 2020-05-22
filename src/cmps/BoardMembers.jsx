import React from 'react'

export function BoardMembers(props) {
    const { members } = props.board
    console.log(members);

    return (
        <div className="nav-board-members flex align-center">
            {members.map((member, idx) => {
                if (member.imgUrl) {
                    return <div key={idx} className="board-member" style={{
                        backgroundImage: "url(" + `${member.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </div>

                }
                else {
                    return <h3 className="nav-user-profile flex justify-center align-center">{member.userName.charAt(0)}</h3>
                }
            })}
            <button className="member-invite">Invite</button>
        </div>
    )
}
