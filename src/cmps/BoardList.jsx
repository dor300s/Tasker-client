import React from 'react';
import BoardPreview from './BoardPreview.jsx'

export default function BoardList(props) {
    const { boards, onBoardClicked, addBoard, saveBoard } = props;
    return (
        <React.Fragment>
            {boards.map((board, idx) => <BoardPreview key={idx} board={board} onBoardClicked={onBoardClicked} saveBoard={saveBoard} />)}
            <div className="board add-board flex justify-center align-center" onClick={addBoard}>
                <h3>Create new board</h3>
            </div>
        </React.Fragment>

    )
}