import React from 'react';

export default function BoardPreview(props) {
    const { board, onBoardClicked, saveBoard } = props
    function getBackground() {
        return board.background.content ? {
            backgroundImage: "url(" + `${board.background.content}` + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        } : { background: board.background.color }
    }

    function starToggle(board, ev) {
        ev.stopPropagation()
        board.isStarred = !board.isStarred;
        saveBoard(board)
    }

    return (
        <React.Fragment>
            <div className="board" onClick={() => onBoardClicked(board._id)} style={getBackground()}>
                <h3>{board.title}</h3>
                <div className={`fs24 ${board.isStarred ? 'starred' : 'not-starred'}`} onClick={(ev) => starToggle(board, ev)} />
            </div>
        </React.Fragment>
    )
}