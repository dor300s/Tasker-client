import React from 'react';
import { connect } from 'react-redux';
import BoardList from '../cmps/BoardList.jsx';
import { setBoards, saveBoard } from '../store/actions/boardActions.js'



class DashBoard extends React.Component {

    componentDidMount() {
        this.props.setBoards();
    }

    onBoardClicked = (id) => {
        this.props.history.push(`/board/${id}`)
    }

    render() {
        const { boards, saveBoard } = this.props;
        let filteredBoards = boards.filter(board => board.isStarred);
        
        

        return (
            <div className="dashboard">
                {Boolean(filteredBoards.length) && <h3 className="label">&#9734; Starred</h3>}
                <div className="boards-container flex">
                    <BoardList boards={filteredBoards} onBoardClicked={this.onBoardClicked} saveBoard={saveBoard} />
                </div>

                <h3 className="label">❒ All Boards</h3>
                <div className="boards-container flex">
                    <BoardList boards={boards} onBoardClicked={this.onBoardClicked} saveBoard={saveBoard} addBoardOption={true} />
                </div>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)