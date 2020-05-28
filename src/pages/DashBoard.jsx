import React from 'react';
import { connect } from 'react-redux';
import BoardList from '../cmps/BoardList.jsx';
import { setBoards, saveBoard, clearCurrBoard } from '../store/actions/boardActions.js'



class DashBoard extends React.Component {


    componentDidMount() {
        this.props.setBoards();
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
                    {Boolean(filteredBoards.length) && <h3>Starred</h3>}
                    <div className="boards-container flex">
                        <BoardList boards={filteredBoards} onBoardClicked={this.onBoardClicked} saveBoard={saveBoard} clearCurrBoard={clearCurrBoard} />
                    </div>
                </section>

                <section className="boards-main-container">
                    <h3>All Boards</h3>
                    <div className="boards-container flex">
                        <BoardList boards={boards} onBoardClicked={this.onBoardClicked} saveBoard={saveBoard} clearCurrBoard={clearCurrBoard} addBoardOption={true} />
                    </div>
                </section>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boardApp.boards,
    }
}
const mapDispatchToProps = {
    setBoards,
    saveBoard,
    clearCurrBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)