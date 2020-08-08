import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadProject } from '../../store/actions/projectAction'
import DisplayProject from '../project/displayProject'

class UserProfile extends Component {

    async componentDidMount() {
        await this.props.loadProject()
    }

    render() {
        if (this.props.log_status === false) {
            return (
                <Redirect to="/signin" />
            )
        }
        else {
            if ((this.props.auth === null || undefined) || (this.props.projects.projects === null || undefined)) {
                return (
                    <div>Loading...</div>
                )
            }
            else {
                // console.log(this.props.projects.projects.data)
                const allProjects = this.props.projects.projects.data
                //console.log(allProjects)
                return (
                    <div>
                        <p>name: {this.props.auth.username}</p>
                        <img src = { this.props.auth.thumbnail } alt = "User Profile Image" height="200" width="200"/>
                        <br />
                        <br />
                        <br />
                        { allProjects && allProjects.map(project => {
                            // console.log(project)
                            if (project.authorID === this.props.auth._id){
                                return (                            
                                    <DisplayProject project = { project } key = { Math.random() } />
                                )
                            }
                        }) }
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    //console.log(state.auth.user)
    return {
        auth : state.auth.user,
        log_status : state.auth.log_status,
        projects : state.project
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProject : () => dispatch(loadProject())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile)