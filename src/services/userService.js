import httpService from './httpService'
import socketService from './socketService'

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
    console.log('Update', user);
    
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

async function logout(user) {
    user.isLogIn = false
    await update(user)
    socketService.off(`user-invite-${user._id}`)
    socketService.off(`user-card-assign-${user._id}`)
    let res = await httpService.post('auth/logout');
   sessionStorage.clear();
    return res
}

function clearNotifications(user) {
    user.notifications.map(notifi => notifi.isRead = true)
    update(user)
}

function _handleLogin(user) {
    user.isLogIn = true ;
    update(user)
    socketService.emit('user login')
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

async function getUserFromSession() {
    

    const session = await httpService.get('auth/session');
    
    return session;
}