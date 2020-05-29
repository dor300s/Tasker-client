import React from 'react';
import BoardPreview from './BoardPreview.jsx'

export default class BoardList extends React.Component {
    state = {
        addBoardForm: false,
        newBoardTitle: '',
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }


    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState({ addBoardForm: false, newBoardTitle: '' })
        }
    }

    openForm = () => {
        this.setState({ addBoardForm: true });
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        this.setState({ newBoardTitle: value })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.createNewBoard();
    }

    handleBlur = () => {
        if (this.state.newBoardTitle) this.createNewBoard();
        else this.setState({ addBoardForm: false });
    }

    createNewBoard() {
        const board = { title: this.state.newBoardTitle }
        this.props.saveBoard(board)
        this.setState({ addBoardForm: false, newBoardTitle: '' })
    }



    render() {
        const { boards, onBoardClicked, saveBoard, addBoardOption, clearCurrBoard, history, editable } = this.props;
        const { addBoardForm, newBoardTitle } = this.state
        return (
            <React.Fragment>
                {boards.map(board => <BoardPreview history={history} key={board._id} board={board} onBoardClicked={onBoardClicked} saveBoard={saveBoard} clearCurrBoard={clearCurrBoard} editable={editable} />)}
                {addBoardOption && <div className="board add-board flex justify-center align-center" onClick={this.openForm} >
                    {!addBoardForm ? <h3>Create new board</h3> :
                        <form onSubmit={this.handleSubmit}>
                            <input placeholder="Board title..." value={newBoardTitle} onChange={this.handleChange} autoFocus onBlur={this.handleBlur} />
                        </form>
                    }
                </div>}
            </React.Fragment>
        )
    }
}