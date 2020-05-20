import React from 'react';
import { Link } from "react-router-dom";
import {getBoards} from "../tempSeviceData/tempBoards"

export default class NavBar extends React.Component {

    state = {
        boards: null,
        isBoardsListActive: false
    }

    componentDidMount(){
    getBoards()
        .then(res => {
            this.setState({boards: res},()=>{console.log('Nav Mount- boards:', this.state.boards)})
        })
    }

    onBoardsClick = () => {
        this.setState(prevState => ({ isBoardsListActive: !prevState.isBoardsListActive }))
    }

    render() {
        return (
            <div className="nav-bar flex align-center">
                <Link to={`/board`}>Home</Link>
                <button onClick={this.onBoardsClick}>Boards</button>
            </div>
        )
    }
}