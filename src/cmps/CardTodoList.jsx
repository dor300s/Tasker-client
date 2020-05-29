import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'
import moment from 'moment'

class CardTodoList extends Component {

    state = {
        isAddModalShown: false,
        newTodoVal: '',
        isListFiltered: false,
        openTodos: null,
        completedTodos: null,
        barFillWidth: null,
        toggleMode: 'Hide'
    }

    componentDidMount() {
        this.getTodosStatus()

    }

    getBarWidth = () => {
        const { openTodos, completedTodos } = this.state
        let totalTodos = openTodos.length + completedTodos.length;
        let barFillWidth = (completedTodos.length / totalTodos) * 100;
        this.setState({ barFillWidth })
    }

    getTodosStatus = () => {
        const { card, board } = this.props
        let openTodos = card.checkList.filter(item => !item.isDone)
        let completedTodos = card.checkList.filter(item => item.isDone)
        this.setState({ openTodos, completedTodos }, () => {
            this.getBarWidth()
            this.props.saveBoard(board)
        })

    }

    onComplete = (todo) => {
        const { board } = this.props
        todo.isDone = !todo.isDone
        this.props.saveBoard(board)
        this.getTodosStatus()
    }

    onAddTodo = () => {
        this.setState(prevState => ({ isAddModalShown: !prevState.isAddModalShown }))
    }

    onHideComplete = () => {
        let toggleMode = ''
        if (this.state.toggleMode === 'Hide') toggleMode = 'Show'
        else toggleMode = 'Hide'
        this.setState(prevState => ({ isListFiltered: !prevState.isListFiltered, toggleMode }))
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
        this.setState({ isAddModalShown: false, newTodoVal: '' })
        this.getTodosStatus()
    }

    render() {
        const { card, board, user } = this.props
        const { barFillWidth, toggleMode } = this.state
        const { newTodoVal, isAddModalShown, isListFiltered, openTodos, completedTodos } = this.state
        let list = []
        if (isListFiltered) list = card.checkList.filter(item => !item.isDone)
        else list = card.checkList

        if (!openTodos) return 'loading'
        return (
            <div className="card-details-description">
                <div className="flex align-center" style={{ marginBottom: "10px" }}>
                    <span className="list"></span>
                    <h4>Todos</h4>
                    {/* <span className="open-todos-indicator" style={{ marginLeft: "20px" }}>{openTodos.length}</span> */}
                    {/* <span className="complete-todos-indicator" style={{ marginLeft: "30px" }}>{completedTodos.length}</span> */}
                    <button className="todos-hide-complete-btn" onClick={this.onHideComplete}>{`${toggleMode} (${completedTodos.length}) complete items`}</button>
                </div>
                <div className="todos-bar-wrapper">
                    <span className="todos-bar-fill" style={{ width: `${barFillWidth}%` }} />
                </div>
                <div style={{ marginBottom: "15px" }} className="todo-add-wrapper flex align-center">
                    <button className="todo-add-btn" style={{ marginLeft: "40px", padding: "0px" }}
                        onClick={this.onAddTodo}>+ item</button>
                    {isAddModalShown && <div className="screen" onClick={()=> this.setState({isAddModalShown: false})}>
                        <form onSubmit={this.onSubmit}>
                            <input className="todos-input" value={newTodoVal} type="text" style={{ marginLeft: "20px" }}
                                onChange={this.inputHandler} autoFocus placeholder="Add an item" />
                        </form>
                    </div>}
                    {/* className={`todos-input ${isAddModalShown ? 'fade-input' : ''} `} */}
                </div>

                <div className="todos-container" style={{ marginLeft: "40px", width: "320px" }}>

                    {list.map((todo, idx) => {
                        return <div key={idx} className="flex align-center space-between">
                            <div className="todo-item flex align-center space-between">

                                <div className={todo.isDone ? 'todo-complete' : '' + "flex column"}>
                                    <h3>{todo.content}</h3>
                                    <todoinfo className="todo-info">Added by <tagcolor>{todo.creator}</tagcolor> at <tagcolor>{moment(todo.createdAt).fromNow()}</tagcolor></todoinfo>
                                </div>
                                <span className={todo.isDone ? 'todo-checkbox-complete' : 'todo-checkbox'} onClick={() => this.onComplete(todo)} />
                            </div>
                            {/* {todo.isDone && <button className="todos-delete">Delete</button>} */}
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