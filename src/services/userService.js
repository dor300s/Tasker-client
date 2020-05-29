import httpService from './httpService'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getUserFromSession,
    clearNotifications
}

function getUsers() {
    return httpService.get('user')
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}

async function logout() {
   let res = await httpService.post('auth/logout');
   sessionStorage.clear();
    return res
    
}

function clearNotifications(user) {
    user.notifications.map(notifi => notifi.isRead = true)
    update(user)
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

async function getUserFromSession() {
    

    const session = await httpService.get('auth/session');
    
    return session;
}


/* import Axios from 'axios';
const userUrl = (process.env.NODE_ENV !== 'development') ? '/api/user' : '//localhost:3030/api/user';
const authUrl = (process.env.NODE_ENV !== 'development') ? '/api/auth' : '//localhost:3030/api/auth';
const axios = Axios.create({
    withCredentials: true
});

export default {
    query,
    get,
    remove,
    update,
    login,
    signup,
    logout,
    session,
    clearNotifications
}

function clearNotifications(user) {
    user.notifications.map(notifi => notifi.isRead = true)
    update(user)
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
        .then(res => {
            window.localStorage.setItem('loggedUser', JSON.stringify(res.data));
            return res.data
        })
}

function login(userCreds) {
    return axios.post(`${authUrl}/login`, userCreds)
        .then(res => {
            window.localStorage.setItem('loggedUser', JSON.stringify(res.data));
            return res.data
        })
}
function signup(userCreds) {
    return axios.post(`${authUrl}/signup`, userCreds)
        .then(res => res.data)

}
function logout() {
    return axios.post(`${authUrl}/logout`)
        .then(res => res.data)
}

function session() {
    console.log('sesssion');

    return axios.get(`${authUrl}/session}`)
        .then(res => {
            console.log(res.data)
            return res.data
        })
} */