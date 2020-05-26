import React from 'react'
import moment from 'moment'

export function CardCommentsList(props) {
    const { card, board } = props
    return (
        <div className="card-msgs-container">
            {card.comments.map((comment, idx) => {
                return <div key={idx} className="card-comment-wrapper flex align-center" style={{marginLeft: "45px"  , width:"370px"}}>
                    <div className="user-profile-comment" style={{
                        backgroundImage: "url(" + `${comment.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} >
                    </div>
                    <p className="card-msg-txt">{comment.txt} </p>
                    <p className="card-msg-time">{moment(comment.createdAt).fromNow()} </p>
                    <button className="card-msg-delete" onClick={() => props.deleteComment(idx)}>Delete</button>
                </div>
            })}

        </div>
    )
}
