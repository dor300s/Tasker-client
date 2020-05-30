import React from 'react';
import { update, /* getUserById */ } from '../store/actions/userActions.js'
import { connect } from 'react-redux';
import userService from '../services/userService.js'

class UserDetails extends React.Component {

    state = {
        user: null

    }

    componentDidMount() {
        let user;
        const id = this.props.match.params.userId;
        userService.getById(id)
            .then(res => {
                user = res
                if (!user) this.props.history.push('/')
                else {
                    this.setState({ user })
                }
            })
    }

    render() {

        const { user } = this.state;
        if (!user) return <h3>Loading...</h3>

        return (<div className="user-profile-container flex column">
            <h2>{user.fullName}'s Profile</h2>
            <div></div>
            <img className="user-img" src={user.imgUrl} />
            <p>User Name: {user.userName}</p>
            <p>About:{user.about}</p>
        </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // loggedUser: state.user.loggedInUser
    }
}
const mapDispatchToProps = {
    // getUserById,
    update

}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)