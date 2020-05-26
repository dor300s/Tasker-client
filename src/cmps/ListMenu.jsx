import React, { Component } from "react";
import { connect } from 'react-redux';
import { saveBoard } from '../store/actions/boardActions.js'


class ListMenu extends Component {

    state = {
        isMenuOpen: false
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.closeBoardMenu, false);
        document.addEventListener("keydown", this.closeBoardMenu, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.closeBoardMenu, false);
        document.removeEventListener("keydown", this.closeBoardMenu, false);
    }


    closeBoardMenu = (ev) => {
        ev.stopPropagation();
        if (!this.node.contains(ev.target) || ev.keyCode === 27) {
            this.setState({ isMenuOpen: false })
        }
    }


    openMenu = (ev) => {
        ev.stopPropagation();
        this.setState({ isMenuOpen: true })
    }

    onDeleteList = (cardlistId, ev) => {
        ev.stopPropagation()
        const { currBoard } = this.props;
        console.log(currBoard)
        const { cardLists } = currBoard;
        cardLists.splice(cardlistId, 1);

        this.props.saveBoard(currBoard);
    }

    render() {
        const { onEditListTitle, listId, cardlistId } = this.props
        const { onDeleteList } = this
        const { isMenuOpen } = this.state;

        return (
            <div ref={node => this.node = node} className="list-menu-container">
                <div className="menu-btn hidden" onClick={(event) => this.openMenu(event)}></div>
                {isMenuOpen && <div className="menu-options list-menu ">
                    <div onClick={(event) => onEditListTitle(event)}>Edit Title</div>
                    <div onClick={(event) => onDeleteList(cardlistId, event)}>Delete List</div>
                </div>}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currBoard: state.boardApp.currBoard
    }
}
const mapDispatchToProps = {
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMenu)
