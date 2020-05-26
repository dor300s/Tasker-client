import boardService from '../../services/boardService.js';
import socketService from '../../services/socketService.js'


export function setBoards(filter = '') {

    return dispatch => {
        return boardService.query(filter)
            .then(boards => dispatch({ type: 'SET_BOARDS', boards }))
    }
}

export function setBoard(id) {
    return dispatch => {
        boardService.get(id)
            .then(board => dispatch({ type: 'SET_BOARD', board }))
    }
}

export function removeBoard(boardId) {
    return dispatch => {
        return boardService.remove(boardId)
            .then(() => dispatch({ type: 'REMOVE_BOARD', boardId }))
    }
}

/* export function saveBoard(board) {

    return dispatch => {
        const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD';
        return boardService.save(board)
            .then(savedBoard => {
                socketService.emit('board updated', board._id);
                dispatch({ type, board: savedBoard })
            })
    }
} */


export function saveBoard(board) {

    return async dispatch => {
        const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD';
        const savedBoard = await boardService.save(board)
        socketService.emit('board updated', board._id);
        return dispatch({ type, board: savedBoard })
    }
}
