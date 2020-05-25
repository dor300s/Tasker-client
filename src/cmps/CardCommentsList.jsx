import React from 'react'

export function CardCommentsList(props) {
    const { card, board } = props
    return (
        <div className="card-msgs-container">
            {card.comments.map((comment, idx) => {
                return <div key={idx} className="card-comment-wrapper flex align-center" style={{marginLeft: "40px" , marginBottom:"15px" , width:"370px"}}>
                    <div className="user-profile-comment" style={{
                        backgroundImage: "url(" + `${comment.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} >
                    </div>
                    <p className="card-msg-txt">{comment.txt} </p>
                    <p className="card-msg-time">{comment.createdAt} </p>
                </div>
            })}

        </div>
    )
}
