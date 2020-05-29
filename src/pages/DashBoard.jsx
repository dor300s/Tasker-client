import React from 'react';
import { connect } from 'react-redux';
import BoardList from '../cmps/BoardList.jsx';
import { setBoards, saveBoard, clearCurrBoard } from '../store/actions/boardActions.js'
import socketService from '../services/socketService'
import moment from 'moment'
import { setUser, getUser, update } from '../store/actions/userActions'

class DashBoard extends React.Component {


    componentDidMount() {
        this.props.setBoards()
        this.props.getUser()
    }


    onBoardClicked = (id) => {
        this.props.history.push(`/board/${id}`)
    }

    render() {
        const { boards, saveBoard, clearCurrBoard } = this.props;
        let filteredBoards = boards.filter(board => board.isStarred);



        return (
            <div className="dashboard">
                <section className="boards-main-container">
                    {Boolean(filteredBoards.length) && <h3 className="starred-title">Starred</h3>}
                    <div className="boards-container flex">
                        <BoardList boards={filteredBoards} onBoardClicked={this.onBoardClicked} saveBoard={saveBoard} clearCurrBoard={clearCurrBoard} editable={true} />
                    </div>
                </section>

                <section className="boards-main-container">
                    <h3 className="all-board-title">All Boards</h3>
                    <div className="boards-container flex">
                        <BoardList boards={boards} onBoardClicked={this.onBoardClicked} saveBoard={saveBoard} clearCurrBoard={clearCurrBoard} addBoardOption={true} editable={true} />
                    </div>
                </section>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boardApp.boards,
        loggedUser: state.user.loggedInUser
    }
}
const mapDispatchToProps = {
    setBoards,
    saveBoard,
    clearCurrBoard,
    setUser,
    getUser,
    update
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)