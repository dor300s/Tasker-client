import React from 'react';
import { Link } from "react-router-dom";
import {getBoards} from "../tempSeviceData/tempBoards"
import {NavMenu} from '../cmps/NavMenu'

export class NavBar extends React.Component {

    state = {
        boards: null,
        isMenuActive: false
    }

    componentDidMount(){
    getBoards()
        .then(res => {
            this.setState({boards: res},()=>{console.log('Nav Mount- boards:', this.state.boards)})
        })
    }

    onMenuClick = () => {
        this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }))
    }

    onCloseMenu = () => {
        this.setState({isMenuActive: false })
    }

    render() {
        const {isMenuActive , boards , dynamicClass} = this.state
        return (
            <div className="nav-bar flex align-center">
                <button onClick={this.onMenuClick}>Hamurger</button>
                {isMenuActive && <NavMenu boards={boards} closeMenu={this.onCloseMenu}/>}
            </div>
        )
    }
}