import React from 'react';

export default class BoardMenu extends React.Component {

    state = {
        title: '',
        editTitleMode: false
    }

    componentWillMount() {
        const { board } = this.props;
        this.setState({ title: board.title })

    }


    render() {
        return (
            <div className="board-menu-container flex column space-around">
                <div>Edit title</div>
                <div>Update cover</div>
                <div>Delete board</div>
            </div>
        )
    }
}