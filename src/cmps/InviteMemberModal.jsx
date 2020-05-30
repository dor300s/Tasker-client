import React, { Component } from 'react'
import { loadUsers } from '../store/actions/userActions'
import { connect } from 'react-redux'
import socketService from '../services/socketService'

class InviteMemberModal extends Component {

    state = {
        filteredUsers: null,
        isAlreadyInvitesShown: false
    }

    componentDidMount() {
        this.props.loadUsers()
        document.addEventListener("mousedown", this.onCloseInviteMenu, false);
        document.addEventListener("keydown", this.onCloseInviteMenu, false);
    }

    // componentDidUpdate(prevProps){
    //     if(this.state.users !== this.props.users){
    //         console.log('USERS CHANGED @@@@@@@@@@@@@@@');
    //         this.setState({users: this.props.users})
    //         // this.props.loadUsers()
    //     }
    // }
    
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onCloseInviteMenu, false);
        document.removeEventListener("keydown", this.onCloseInviteMenu, false);
    }


    onCloseInviteMenu = (ev) => {
        ev.stopPropagation();
        if (!this.node.contains(ev.target) || ev.keyCode === 27) {
            // this.setState({ isMenuOpen: false })
            this.props.onCloseInviteMenu();
        }
    }

    inputHandler = ({ target }) => {
        this.props.loadUsers()
        if (!target.value) {
            this.setState({ filteredUsers: null })
            return
        }

        let keyWord = target.value.toLowerCase()
        const { users } = this.props
        let filteredUsers = users.filter(user => user.userName.includes(keyWord.toLowerCase()))
        this.setState({ filteredUsers })
    }

    onInvite = (userId) => {
      let userIdxInBoard = this.props.activeBoard.members.findIndex(user => user._id === userId)
      if(userIdxInBoard !== -1){
       this.setState({isAlreadyInvitesShown: true})
       setTimeout(()=>{
        this.setState({isAlreadyInvitesShown: false})
       },1500)
        return
      }
        let data = {
            invitedUserId: userId,
            sender: this.props.loggedUser.userName,
            collabBoardId: this.props.activeBoard._id,
            createdAt: Date.now()
        }
        socketService.emit('user invite', data);
    }

    render() {
        const { filteredUsers , isAlreadyInvitesShown } = this.state
        const { isInviteModalOpen } = this.props
        console.log(isInviteModalOpen)

        return (
            <div ref={node => this.node = node} className={`invite-members-modal ${(isInviteModalOpen) ? 'modal-open' : ''} flex column align-center`}>
                <div className="invite-header"><h3>Invite to collaborate</h3></div>
                {isAlreadyInvitesShown && <p>User already a member!</p>}
                <input type="text" placeholder="Enter userName to invite" onKeyUp={this.inputHandler} />
                {filteredUsers && <div className="invite-users-list flex column align-center">
                    {filteredUsers.map((user, idx) => {
                        return <div key={idx} className="user-to-invite flex align-center space-between ">
                            <span className="nav-user-profile" style={{
                                backgroundImage: "url(" + `${user.imgUrl}` + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            </span>
                            <h4>{user.fullName}</h4>
                            <button className="user-invite-btn" onClick={() => this.onInvite(user._id)}>Invite</button>
                            {user.isLogIn &&
                                <div className="user-status flex column align-center">
                                    <span className="user-online"></span>
                                    <h5>Online</h5>
                                </div>}

                            {!user.isLogIn &&
                                <div className="user-status flex column align-center">
                                    <span className="user-offline"></span>
                                    <h5>Offline</h5>
                                </div>}

                        </div>
                    })}
                </div>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.user.users,
        loggedUser: state.user.loggedInUser,
        activeBoard: state.boardApp.currBoard
    }
}

const mapDispatchToProps = {
    loadUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteMemberModal)