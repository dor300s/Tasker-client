import React from 'react';
import { withRouter } from 'react-router-dom';
import BoardList from '../cmps/BoardList';
import { NavMenuFilter } from '../cmps/NavMenuFilter';
import { connect } from 'react-redux';
import { setBoards, setBoard } from '../store/actions/boardActions.js';

class NavMenu extends React.Component {

    state = {
        filteredBoards: null,
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.onCloseMenu, false);
        document.addEventListener("keydown", this.onCloseMenu, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onCloseMenu, false);
        document.removeEventListener("keydown", this.onCloseMenu, false);
    }

    onCloseMenu = (ev) => {
        ev.stopPropagation();
        if (!this.node.contains(ev.target) || ev.keyCode === 27) {
            // this.setState({ isMenuOpen: false })
            this.props.onCloseMenu();
        }
    }

    onBoardClicked = (id) => {
        this.props.history.push(`/board/${id}`)
        this.props.setBoard(id)
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

    onHomeBtnClick = () => {
        this.props.history.push(`/board`)
        this.props.onCloseMenu();
    }

    render() {
        const { currBoard, boards, isMenuActive } = this.props
        const { filteredBoards } = this.state
        let starredBoards = boards.filter(board => board.isStarred);

        return (
            <div className={`nav-menu flex column ${(isMenuActive)? "nav-open": ""}`} ref={node => this.node = node}>
                {currBoard &&
                    <div className="home-button flex align-center justify-center cursor" onClick={() => this.onHomeBtnClick()} >
                        <div className="dashboard-btn"></div>
                        <div className="flex align-center justify-center">Dashboard</div>
                    </div>}
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
                            <h3 className="list-header">Starred</h3>
                            <div className="boards-container flex column align-center">
                                <BoardList boards={starredBoards} onBoardClicked={this.onBoardClicked} />
                            </div> </>}
                        <div>
                            {/* <h3 className=""></h3> */}
                            <h3 className="list-header">All Boards</h3>
                        </div>
                        <div className="boards-container flex column align-center">
                            <BoardList boards={boards} onBoardClicked={this.onBoardClicked} />
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

// export default withRouter(NavMenu);
const mapDispatchToProps = {
    setBoards,
    setBoard
}
export default connect(null, mapDispatchToProps)(withRouter(NavMenu))

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashBoard))