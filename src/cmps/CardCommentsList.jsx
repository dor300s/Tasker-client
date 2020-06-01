import React from 'react'
import moment from 'moment'

export function CardCommentsList(props) {
    const { card, user } = props
    return (
        <div className="card-msgs-container">
            {card.comments.map((comment, idx) => {
                return <div key={idx} className="card-comment-wrapper flex align-start" style={{ marginLeft: "44px", width: "370px" }}>
                    {user.imgUrl && <div className="user-profile-comment" style={{
                        backgroundImage: "url(" + `${comment.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        minWidth:"30px"
                    }} >
                    </div>}
                    {!user.imgUrl && <h3 style={{ marginLeft: "0px", marginRight: "15px", width: "30px", height: "30px" }} className="card-user-profile flex justify-center align-center">{user.fullName.charAt(0)}</h3>}
                    <div style={{width:"100%" , marginBottom: "10px"}} className="flex column align-start">
                        <p className="card-msg-txt">{comment.txt} </p>
                        <div className="flex align-center">
                            <p className="card-msg-time">{moment(comment.createdAt).fromNow()} </p>
                            <button className="card-msg-delete" onClick={() => props.deleteComment(idx)}>Delete</button>
                        </div>
                    </div>
                </div>
            })}

        </div>
    )
}
