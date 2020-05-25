import React, { Component } from "react";
import { connect } from 'react-redux';
import { saveBoard } from '../store/actions/boardActions.js'


class ListMenu extends Component {

    state = {
        isMenuOpen: false
    }

    componentWillMount() {
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
            // setTimeout(() => this.setState({ isMenuOpen: false }), 200);
            this.setState({ isMenuOpen: false })
        }
    }


    openMenu = (ev) => {
        ev.stopPropagation();
        this.setState({ isMenuOpen: true })
    }

    onDeleteList = (listId, listListId, ev) => {
        ev.stopPropagation()
        console.log(this.props.currBoard)
        const currBoard = JSON.parse(JSON.stringify(this.props.currBoard));
        const { listLists } = currBoard;
        const list = listLists.find(listList => listList.id === listListId);
        const listIdx = list.lists.findIndex(list => list.id === listId);

        list.lists.splice(listIdx, 1);
        this.props.saveBoard(currBoard);
    }

    render() {
        const { onEditListHeader, listId, listListId } = this.props
        const { onDeleteList } = this
        const { isMenuOpen } = this.state;

        return (
            <div ref={node => this.node = node} className="list-menu-container">
                <div  className="menu-btn hidden" onClick={(event) => this.openMenu(event)}></div>
                {isMenuOpen && <div className="menu-options list-menu ">
                    <div onClick={(event) => onEditListHeader(event)}>Edit Title</div>
                    <div onClick={(event) => onDeleteList(listId, listListId, event)}>Delete List</div>
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
