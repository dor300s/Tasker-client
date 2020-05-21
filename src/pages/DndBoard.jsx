import React from 'react';
import { getBoards } from '../tempSeviceData/tempBoardData.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DndList from './DndList.jsx';
import DndAddBtn from './DndAddBtn';

export default class DndBoard extends React.Component {
    state = {}

    componentDidMount() {
        this.loadBoard()
    }

    loadBoard() {
        const currBoard = getBoards()
        this.setState(currBoard[0])
    }

    onDragEnd(){
        console.log('drag end..');
        
    }


    render() {
        const lists = this.state.cardLists;
        if (!lists) return <h2>no lists</h2>

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="board-container flex">
                    {lists.map(list => (
                        <DndList listId={list.id} key={list.id} title={list.title} cards={list.cards} />
                    ))}
                    <DndAddBtn />
                </div>
            </DragDropContext>
        )


    }
}

