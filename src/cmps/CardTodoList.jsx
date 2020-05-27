import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'
import moment from 'moment'

class CardTodoList extends Component {

    state = {
        isAddModalShown: false,
        newTodoVal: ''
    }

    onComplete = (todo) => {
        const { board } = this.props
        todo.isDone = !todo.isDone
        this.props.saveBoard(board)
    }

    onAddTodo = () => {
        this.setState(prevState => ({ isAddModalShown: !prevState.isAddModalShown }))
    }

    inputHandler = ({ target }) => {
        this.setState({ newTodoVal: target.value })
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        const { card, board, user } = this.props
        let todo = {
            content: this.state.newTodoVal,
            creator: user.userName,
            isDone: false,
            createdAt: Date.now()
        }
        card.checkList.unshift(todo)
        this.props.saveBoard(board)
    }

    render() {
        const { card, board, user } = this.props
        const { newTodoVal } = this.state
        return (
            <div className="card-details-description">
                <div className="flex align-center" style={{ marginBottom: "10px" }}>
                    <span className="list"></span>
                    <h4>Todos</h4>
                    <span style={{ marginLeft: "50px" }}>5</span>
                    <span style={{ marginLeft: "20px" }}>12</span>
                </div>
                <div style={{ marginBottom: "15px" }} className="flex align-center">
                    <button style={{ marginLeft: "40px", padding: "0px" }}
                        onClick={this.onAddTodo}>+ todo item</button>
                    <form onSubmit={this.onSubmit}>
                        <input className="todos-input" value={newTodoVal} type="text" style={{ marginLeft: "20px" }}
                            onChange={this.inputHandler} />
                    </form>
                </div>

                <div className="todos-container" style={{ marginLeft: "40px", width: "320px" }}>

                    {card.checkList.map((todo, idx) => {
                        return <div key={idx} className="flex">
                            <div className="todo-item flex align-center space-between">

                                <div className={todo.isDone ? 'todo-complete' : '' + "flex column"}>
                                    <h3>{todo.content}</h3>
                                    <todoinfo className="todo-info">Added by <tagcolor>{todo.creator}</tagcolor> at <tagcolor>{moment(todo.createdAt).fromNow()}</tagcolor></todoinfo>
                                </div>
                                <span className={todo.isDone ? 'todo-checkbox-complete' : 'todo-checkbox'} onClick={() => this.onComplete(todo)} />
                            </div>
                            {todo.isDone && <button className="todos-delete">Delete</button>}
                        </div>
                    })}
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = {
    saveBoard,
}

export default connect(null, mapDispatchToProps)(CardTodoList)