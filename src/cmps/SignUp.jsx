import React from 'react';
import { connect } from 'react-redux'
import { signup } from '../store/actions/userActions'
import { Link } from 'react-router-dom'

class SignUp extends React.Component {


    state = {
        fullName: null,
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
        const { fullName, password, username } = this.state
        const credentials = {
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
            <div className="signup-container flex column space-between align-center">
                <h2>Signup</h2>
                <form className="flex column space-between" onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Full name" name="fullName" onChange={this.inputHandler} required />
                    <input type="text" placeholder="username" name="username" onChange={this.inputHandler} required />
                    <input type="password" placeholder="Password" name="password" onChange={this.inputHandler} required />
                    <button>Signup</button>
                </form>
                <p>Already have an account? <Link to="/login">login</Link></p>
            </div>
        )
    }
}
const mapDispatchToProps = {
    signup
}

export default connect(null, mapDispatchToProps)(SignUp)