import React from 'react'
import { IconPreview } from './IconPreview.jsx'
import { BoardMembers } from './BoardMembers.jsx'
import moment from 'moment';

export function CardIconsPreview(props) {
    const { card , history } = props
    // console.log("card", card);


    if (!card) return 'loading'
    return (
        <div className="wrap-icons">
            <div className="card-icons flex space-between ">
                {/* {card.dueDate && <IconPreview icon={'dueDate'} num={moment(card.dueDate).format("Do MMM").replace(" ", "").replace('th', '')} />}
                {Boolean(card.attachments.length) && <IconPreview icon={'attachments'} num={card.attachments.length} />}
                {Boolean(card.comments.length) && <IconPreview icon={'comments'} num={card.comments.length} />}
                {Boolean(card.description.length) && <IconPreview icon={'description'} num={card.description.length} />}
                {card.isStared && <IconPreview icon={'star'} num={card.isStared} />}
                {card.checkList.items && Boolean(card.checkList.items.length) && <IconPreview icon={'checkList'} num={card.checkList.items.length} />} */}
            </div>
            { Boolean(card.members.length) && <BoardMembers history={history} board={card} cardMemberMode={true} />}
            {/* {card.members.length && <div className="members"><img src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png" alt=""/></div>} */}
        </div>
    )
}
