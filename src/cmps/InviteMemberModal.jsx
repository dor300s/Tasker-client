import React, { Component } from 'react'
import {loadUsers} from '../store/actions/userActions'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
class InviteMemberModal extends Component {


    componentDidMount(){
        this.props.loadUsers()
    }

    render() {
        const {allUsers} = this.props
        console.log('inviteModal' , allUsers);
        if(!allUsers.length) return 'loading'
        return (
            <div>
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        allUsers: state.user.users
    }
}

const mapDispatchToProps = {
    loadUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InviteMemberModal))