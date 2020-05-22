import React from 'react'
import { IconPreview } from './IconPreview.jsx'
import moment from 'moment';

export function CardIconsPreview(props) {
    const { card } = props
    // console.log("card", card);


    if (!card) return 'loading'
    return (
        <div className="wrap-icons">
            <div className="card-icons flex space-between ">
                {card.dueDate && <IconPreview icon={'dueDate'} num={moment(card.dueDate).format("Do MMM").replace(" ", "").replace('th', '')} />}
                {card.attachments.length && <IconPreview icon={'attachments'} num={card.attachments.length} />}
                {card.comments.length && <IconPreview icon={'comments'} num={card.comments.length} />}
                {card.description.length && <IconPreview icon={'description'} num={card.description.length} />}
                {card.isStared && <IconPreview icon={'star'} num={card.isStared} />}
                {card.checkList.items && card.checkList.items.length && <IconPreview icon={'checkList'} num={card.checkList.items.length} />}
            </div>
            {card.members.length && <div className="members"><img src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png" alt=""/></div>}
        </div>
    )
}
