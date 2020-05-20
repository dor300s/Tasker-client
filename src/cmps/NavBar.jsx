import React from 'react';
import { Link } from "react-router-dom";
import { getBoards } from "../tempSeviceData/tempBoardData"
import { NavMenu } from '../cmps/NavMenu'


export class NavBar extends React.Component {

    state = {
        boards: null,
        isMenuActive: false
    }

    componentDidMount() {
       const boards =  getBoards()

        this.setState({ boards }, () => { console.log('Nav Mount- boards:', this.state.boards) })
    }

    onMenuClick = () => {
        this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }))
    }

    onCloseMenu = () => {
        this.setState({ isMenuActive: false })
    }

    render() {
        const { isMenuActive, boards } = this.state
        return (
            <nav className="nav-bar flex align-center">
                <button onClick={this.onMenuClick}>Hamurger</button>
                {isMenuActive && <NavMenu history={this.props.history} boards={boards} closeMenu={this.onCloseMenu} />}
            </nav>
        )
    }
}