import React from 'react'
import { IconPreview } from './IconPreview.jsx'
import { BoardMembers } from './BoardMembers.jsx'
import moment from 'moment';

export function CardIconsPreview(props) {
    const { card, history } = props

    function getTime(val) {
        if (Math.floor((val - Date.now()) / (24 * 60 * 60 * 1000)) < 0) return 'Today';
        else if (Math.ceil((val - Date.now()) / (24 * 60 * 60 * 1000)) <= 1) return 'Tomorrow';
        else if (Math.floor((val - Date.now()) / (24 * 60 * 60 * 1000)) < 7) return moment(val).format("dddd");
        else return moment(val).format("MMM DD");
    }

    function getColor(val) {
        if ((val - Date.now()) <= (24 * 60 * 60 * 1000)) return '#e74c3c';
        else if ((val - Date.now()) <= (4 * 24 * 60 * 60 * 1000)) return '#e67e22';
        else return '#2ecc71';
    }

    function getDoneTodos(checkList) {
        let done = checkList.reduce((acc, todo) => todo.isDone ? acc + 1 : acc, 0)
        return done;

    }

    if (!card) return 'loading'
    return (
        <div className="wrap-icons">
            <div className="card-icons flex space-between align-center">
                {card.dueDate && <IconPreview color={getColor(card.dueDate)} icon={'clock-blue'} num={getTime(card.dueDate)} />}
                <div className="items-wrap flex">
                    {/* {Boolean(card.attachments.length) && <IconPreview icon={'attachments'} num={card.attachments.length} />} */}
                    {Boolean(card.comments.length) && <IconPreview icon={'conversation-blue'} num={card.comments.length} />}
                    {Boolean(card.checkList.length) && <IconPreview icon={'checklist-blue'} num={card.checkList.length} isDone={getDoneTodos(card.checkList)} />}
                </div>
            </div>
            <div className="members-placeholder">
                {Boolean(card.members.length) && <BoardMembers history={history} board={card} cardMemberMode={true} />}
            </div>
        </div>
    )
}
