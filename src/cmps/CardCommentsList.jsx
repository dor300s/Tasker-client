import React from 'react'
import moment from 'moment'

export function CardCommentsList(props) {
    const { card, board , user } = props
    return (
        <div className="card-msgs-container">
            {card.comments.map((comment, idx) => {
                return <div key={idx} className="card-comment-wrapper flex align-center" style={{marginLeft: "44px"  , width:"370px"}}>
                   {user.imgUrl && <div className="user-profile-comment" style={{
                        backgroundImage: "url(" + `${comment.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} >
                    </div>}
                    {!user.imgUrl && <h3 style={{marginLeft: "0px" , marginRight:"15px" , width:"30px", height:"30px"}} className="card-user-profile flex justify-center align-center">{user.fullName.charAt(0)}</h3>}
                    <p className="card-msg-txt">{comment.txt} </p>
                    <p className="card-msg-time">{moment(comment.createdAt).fromNow()} </p>
                    <button className="card-msg-delete" onClick={() => props.deleteComment(idx)}>Delete</button>
                </div>
            })}

        </div>
    )
}
