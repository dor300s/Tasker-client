import React from 'react';

export class NavMenuFilter extends React.Component {

    inputHandler = ({ target }) => {
        this.props.onFilter(target.value)
    }

    render() {
        return (
            <div className="nav-menu-filter flex justify-center align-center">
                <input className="board-search" type="text" name="keyword" placeholder="Search a board" onChange={this.inputHandler} />
            </div>
        )
    }
}