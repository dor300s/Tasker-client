import React from 'react';
import BoardMenu from './BoardMenu.jsx'

export default class BoardPreview extends React.Component {

    state = {
        isModalOpen: false
    }

    getBackground(board) {
        return board.background.content ? {
            backgroundImage: "url(" + `${board.background.content}` + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        } : { background: board.background.color }
    }

    starToggle(board, ev) {
        const { saveBoard } = this.props;
        ev.stopPropagation()
        board.isStarred = !board.isStarred;
        saveBoard(board)
    }

    openMenu = (ev) => {
        ev.stopPropagation();
        this.setState({ isModalOpen: true });

    }



    render() {
        const { isModalOpen } = this.state
        const { board, onBoardClicked } = this.props

        return (
            < React.Fragment >
                <div className="board" onClick={() => onBoardClicked(board._id)} style={this.getBackground(board)}>
                    <h3>{board.title}</h3>
                    <div className={`fs24 ${board.isStarred ? 'starred' : 'not-starred'}`} onClick={(ev) => this.starToggle(board, ev)} />
                    <div className="menu-btn" onClick={this.openMenu} />
                    {isModalOpen && <BoardMenu isModalOpen={isModalOpen} board={board} />}
                </div>
            </React.Fragment >
        )
    }
}

