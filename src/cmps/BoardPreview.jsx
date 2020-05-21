import React from 'react';

export default function BoardPreview(props) {
    const { board, onBoardClicked } = props
    function getBackground() {
        return board.background.content ? {
            backgroundImage: "url(" + `${board.background.content}` + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        } : {background: board.background.color}

    }


    return (
        <React.Fragment>
            <div className="board" onClick={() => onBoardClicked(board._id)} style={getBackground()}>
                <h3>{board.title}</h3>
            </div>
        </React.Fragment>
    )
}