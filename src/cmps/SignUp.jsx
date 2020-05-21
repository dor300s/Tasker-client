import React from 'react';
import { connect } from 'react-redux'
import { signup } from '../store/actions/userActions'
class SignUp extends React.Component {


    state = {
        fullName: null,
        email: null,
        password: null,
        username: null
    }

    inputHandler = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { fullName, email, password, username } = this.state
        const credentials = {
            email,
            password,
            fullName,
            username,
            isGuest: false
        }

        this.props.signup(credentials)
            .then(() => this.props.history.push('/board'))
            .catch(res => console.log(res)) //todo Show an error modal
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Full name" name="fullName" onChange={this.inputHandler} required />
                    <input type="text" placeholder="Email" name="email" onChange={this.inputHandler} required />
                    <input type="text" placeholder="username" name="username" onChange={this.inputHandler} required />
                    <input type="password" placeholder="Password" name="password" onChange={this.inputHandler} required />
                    <button>SignUp</button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = {
    signup
}

export default connect(null, mapDispatchToProps)(SignUp)