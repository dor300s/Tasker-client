import React, { Component } from 'react'
import { loadUsers } from '../store/actions/userActions'
import { connect } from 'react-redux'
class InviteMemberModal extends Component {

    state = {
        filteredUsers: null
    }

    componentDidMount() {
        this.props.loadUsers()
        document.addEventListener("mousedown", this.onCloseInviteMenu, false);
        document.addEventListener("keydown", this.onCloseInviteMenu, false);
    }

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
        if (!target.value) {
            this.setState({ filteredUsers: null })
            return
        }

        let keyWord = target.value.toLowerCase()
        const { users } = this.props
        let filteredUsers = users.filter(user => user.userName.includes(keyWord.toLowerCase()))
        this.setState({ filteredUsers })
    }

    render() {
        const { filteredUsers } = this.state
        const { isInviteModalOpen } = this.props
        console.log(isInviteModalOpen)

        return (
            <div  ref={node => this.node = node} className={`invite-members-modal ${(isInviteModalOpen)? 'modal-open': ''} flex column align-center`}>
                <div className="invite-header"><h3>Invite to collaborate</h3></div>
                {/* <p>Add board members</p> */}
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
                            <button className="user-invite-btn">Invite</button>
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
        users: state.user.users
    }
}

const mapDispatchToProps = {
    loadUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteMemberModal)