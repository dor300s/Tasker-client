import React from 'react';
import { Link } from "react-router-dom";


export class NavMenu extends React.Component {

    state = {

    }

    componentDidMount() {

    }



    render() {
        const { boards } = this.props
        return (
            <div className="nav-menu flex column">
                <div className="nav-menu-header flex align-center space-between">
                    <Link to={`/board`}>Home</Link>
                    <button onClick={this.props.closeMenu}>X</button>
                </div>
                <div className="flex align-center justify-center">
                    <h3>Personal boards</h3>
                </div>
                {/* <NavBoardsList boards={boards} /> */}
            </div>
        )
    }
}