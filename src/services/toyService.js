import Axios from 'axios'
const baseUrl = (process.env.NODE_ENV !== 'development') ? '/api/toy' : '//localhost:3030/api/toy';
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

function save(toy) {
    let prm;
    if (toy._id) {
        prm = axios.put(`${baseUrl}/${toy._id}`, toy)
    } else {
        prm = axios.post(baseUrl, toy)
    }
    return prm.then(res => res.data)
}
