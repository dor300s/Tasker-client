import toyService from '../services/toyService.js'

export function setToys(filter = '') {
    return dispatch => {
        return toyService.query(filter)
            .then(toys => dispatch({ type: 'SET_TOYS', toys }))
    }
}

export function setToy(id) {
    return dispatch => {
        toyService.get(id)
            .then(toy => dispatch({ type: 'SET_TOY', toy }))
    }
}

export function removeToy(toyId) {
    return dispatch => {
        return toyService.remove(toyId)
            .then(() => dispatch({ type: 'REMOVE_TOY', toyId }))
    }
}

export function saveToy(toy) {
    return dispatch => {
        const type = toy._id ? 'UPDATE_TOY' : 'ADD_TOY';
        return toyService.save(toy)
            .then(savedToy => dispatch({ type, toy: savedToy }))
    }
}
