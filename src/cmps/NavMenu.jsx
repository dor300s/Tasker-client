import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import BoardList from '../cmps/BoardList';
import { NavMenuFilter } from '../cmps/NavMenuFilter'

class NavMenu extends React.Component {

    state = {
        filteredBoards: null
    }

    componentDidMount() {

    }

    onBoardClicked = (id) => {
        this.props.history.push(`/board/${id}`)
    }

    onFilter = (filterBy) => {
        console.log(filterBy);

        if (!filterBy.length) {
            this.setState({ filteredBoards: null })
            return
        }
        const { boards } = this.props
        const filteredBoards = boards.filter(board => board.title.toLowerCase().includes(filterBy.toLowerCase()));

        this.setState({ filteredBoards })
    }

    render() {
        const { boards } = this.props
        const { filteredBoards } = this.state
        let starredBoards = boards.filter(board => board.isStarred);

        return (
            <div className="nav-menu flex column">
                <div className="nav-menu-header flex align-center space-between">
                    <Link className="home-btn" to={`/board`}>Home</Link>
                    <button className="close-btn" onClick={this.props.closeMenu}>X</button>
                </div>
                <NavMenuFilter onFilter={(filterBy) => this.onFilter(filterBy)} />

                <div className="nav-boards-preview-wrapper flex column">
                    <div className="nav-board-preview-overlay"></div>

                    {filteredBoards && <h3 className="label searched-boards-header">Searched Boards</h3>}
                    {filteredBoards && !filteredBoards.length && <h4 className="label no-match">- There is no matches</h4>}
                    {filteredBoards && <div className="boards-container flex column align-center">
                        <BoardList boards={filteredBoards} onBoardClicked={this.onBoardClicked} />
                    </div>}


                    {Boolean(boards.length) && <div>
                        {Boolean(starredBoards.length) && <>
                            <h3 className="label"><span>&#9734;</span> Starred</h3>
                            <div className="boards-container flex column align-center">
                                <BoardList boards={starredBoards} onBoardClicked={this.onBoardClicked} />
                            </div> </>}

                        <h3 className="label">❒ All Boards</h3>
                        <div className="boards-container flex column align-center">
                            <BoardList boards={boards} onBoardClicked={this.onBoardClicked} />
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default withRouter(NavMenu);


// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashBoard))