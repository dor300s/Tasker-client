import React from 'react';
// import { getBoards } from '../tempSeviceData/tempBoardData.js';
import { connect } from 'react-redux';
import BoardList from '../cmps/BoardList.jsx';
import { setBoards, saveBoard } from '../store/actions/boardActions.js'
import userService from '../services/userService.js'


class DashBoard extends React.Component {

    componentDidMount() {
        this.props.setBoards();
        // userService.session();
    }

    onBoardClicked = (id) => {
        this.props.history.push(`/board/${id}`)
    }

    addBoard() {
        console.log('hii');

    }


    render() {
        const { boards, saveBoard } = this.props;
        let filteredBoards = boards.filter(board => board.isStarred);

        return (
            <div className="dashboard">
                <h3 className="label">&#9734; Starred</h3>
                <div className="boards-container flex">
                    <BoardList boards={filteredBoards} onBoardClicked={this.onBoardClicked} addBoard={this.addBoard} saveBoard={saveBoard} />
                </div>

                <h3 className="label">❒ All Boards</h3>
                <div className="boards-container flex">
                    <BoardList boards={boards} onBoardClicked={this.onBoardClicked} addBoard={this.addBoard} saveBoard={saveBoard} />
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boardApp.boards
    }
}
const mapDispatchToProps = {
    setBoards,
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)