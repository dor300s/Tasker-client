import Axios from 'axios';
const userUrl = (process.env.NODE_ENV !== 'development') ? '/api/user' : '//localhost:3030/api/user';
const authUrl = (process.env.NODE_ENV !== 'development') ? '/api/auth' : '//localhost:3030/api/auth';
const axios = Axios.create({
    withCredentials: true
})

export default {
    query,
    get,
    remove,
    update,
    login,
    signup,
    logout
}

function query() {
    return axios.get(userUrl)
        .then(res => res.data)
}

function get(id) {
    return axios.get(`${userUrl}/${id}`)
        .then(res => res.data)
}

function remove(id) {
    return axios.delete(`${userUrl}/${id}`)
}

function update(user) {
    return axios.put(`${userUrl}/${user._id}`, user)
        .then(res => res.data)
}

function login(userCreds) {
    return axios.post(`${authUrl}/login`, userCreds)
        .then(res => res.data)
}
function signup(userCreds) {
    return axios.post(`${authUrl}/signup`, userCreds)
        .then(res => console.log(res.data))

}
function logout() {
    return axios.post(`${authUrl}/logout`)
        .then(res => res.data)
}

