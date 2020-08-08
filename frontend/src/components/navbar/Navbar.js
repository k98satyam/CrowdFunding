import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import { logOut } from '../../store/actions/authAction'


class Navbar extends Component  {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout = (e) => {
        e.preventDefault()
        this.props.logOut()
    }

    render(){
        if (this.props.log_status === false) {
            // console.log(this.props)
            return (
                <Redirect to = "/signin" />
            )
        }
        if (this.props.auth === null || undefined) {
            // console.log(this.props)
            return (
                <div></div>
            )
        }
        else {
            return (
                <ul className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <ul className="navbar-nav">                
                        <li className="nav-item">
                            <NavLink to = '/' className = "navbar-brand">UbhartaaBharat</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to = '/create'>New Project</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/profile'>{ this.props.auth.username }</NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick = { this.logout }>LogOut</a>
                        </li>
                    </ul>
                </ul>
            )
        }
    }
}

const mapStateToProps = (state) => {
        // console.log(state.auth)
        return {
            auth: state.auth.user,
            log_status: state.auth.log_status
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)