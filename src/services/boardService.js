import Axios from 'axios';
const baseUrl = (process.env.NODE_ENV !== 'development') ? '/api/board' : '//localhost:3030/api/board';
const axios = Axios.create({
    withCredentials: true
});

export default {
    query,
    get,
    remove,
    save
}

function query(filter) {
    return axios.get(baseUrl, { params: { ...filter } })
        .then(res => res.data)
}

function get(id) {
    return axios.get(`${baseUrl}/${id}`)
        .then(res => res.data)
}

function remove(id) {
    return axios.delete(`${baseUrl}/${id}`)
}

function save(board) {
    let prm;
    if (board._id) {
        prm = axios.put(`${baseUrl}/${board._id}`, board)
    } else {
        prm = axios.post(baseUrl, board)
    }
    return prm.then(res => res.data)
}
