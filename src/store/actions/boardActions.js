import boardService from '../../services/boardService.js';
import socketService from '../../services/socketService.js'


export function setBoards(filter = '') {

    return async dispatch => {
        try {
            const boards = await boardService.query(filter)
            return dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log('boardAction: error in setBoards:', err);

        }
    }
}

export function clearCurrBoard() {
    return async dispatch => {
        try {
            return dispatch({ type: 'RESET_BOARD' })
        } catch (err) {
            console.log('Dont earse currBoard', err);
        }
    }
}

export function setBoard(id) {
    return async dispatch => {
        try {
            const board = await boardService.get(id)
            return dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('boardAction: error in setBoard:', err);
        }
    }
}

export function removeBoard(boardId) {
    return async dispatch => {
        try {
            await boardService.remove(boardId)
            dispatch({ type: 'REMOVE_BOARD', boardId })

        } catch (err) {
            console.log('boardAction: error in removeBoard:', err);
        }
    }
}


export function saveBoard(board) {

    return async dispatch => {
        try {
            const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD';
            const savedBoard = await boardService.save(board)
            socketService.emit('board updated', board._id);
            return dispatch({ type, board: savedBoard })
        } catch (err) {
            console.log('boardAction: error in saveBoard:', err);
        }
    }
}
