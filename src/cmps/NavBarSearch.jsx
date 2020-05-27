import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import BoardList from '../cmps/BoardList';
import { NavMenuFilter } from '../cmps/NavMenuFilter'

export default class NavBarSearch extends React.Component {

    state = {
        searchWord: "",
        filterBoards: "",
        filterUsers: "",
        filterLists: "",
        filterCards: ""
    }



    componentDidMount() {

    }

    inputHandler = ({ target }) => {
        this.props.onFilter(target.value)
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
        // const { boards } = this.props
        const { searchWord, filterBoards, filterUsers, filterLists, filterCards } = this.state

        return (
            <div className="nav-search-result-container flex column">
                <input className="card-search" type="text" value={searchWord} name="keyword" placeholder="Search..." onChange={this.inputHandler} />
                <div className="nav-search-result">
                    {filterBoards && <div>board result
                        filterBoards.map(board => (
                            <div></div>
                        ))
                        </div>}
                    {filterLists && <div>list result</div>}
                    {filterCards && <div>cards result</div>}
                    {filterUsers && <div>user result</div>}
                </div>
            </div>
        )
    }
}


