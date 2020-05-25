import boardService from '../../services/boardService.js';
import socketService from '../../services/socketService'

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

export function saveBoard(board) {
    return dispatch => {
        const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD';
        return boardService.save(board)
            .then(savedBoard => dispatch({ type, board: savedBoard }))
            
    }
}

