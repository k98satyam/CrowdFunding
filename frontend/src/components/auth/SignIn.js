import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        window.open('http://localhost:3000/auth/google','_self')
    }

    render() {
        if (this.props.log_status === true) {
            return (
                <Redirect to="/profile" />
            )
        }
        else {
            return (
                <div>
                    <button onClick = { this.handleSubmit }>LogIn Using Google+</button>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        log_status : state.auth.log_status
    }
}

export default connect(mapStateToProps)(SignIn)