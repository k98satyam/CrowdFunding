import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import icon from './images/icon.svg'
import { connect } from 'react-redux'
import { uploadProject } from '../../store/actions/projectAction'
import Axios from 'axios'

class CreateProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            authorName : '',
            authorID: '',
            title : '',
            description : '',
            category : '',
            goal : '',
            image : null,
            formData: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        await Axios.post("http://localhost:3000/image/setimagebuffer",this.state.formData)
            .then((data) => {
                this.setState({
                    imageID: data.data._id
                })
            })
        // console.log(this.state)
        this.setState({
            authorName: this.props.auth.username,
            authorID: this.props.auth._id
        }, () => {
            this.props.uploadProject(this.state)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleImageChange = (e) => {
        const formData = new FormData()
        formData.append('ImageData', e.target.files[0])
        this.setState({
            formData: formData
        })
    }

    render() {
        require('./createProject.css')
        if (this.props.log_status === false) {
            return (
                <Redirect to="/signin" />
            )
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset=md-1">
                            <div className="row">
                                <div className="col-md-5 add-left">
                                    <img src={ icon }/>
                                    <h3>Donate Us</h3>
                                    <p>Make a Donation to Project by Providing Funds. Donate Now!</p>
                                    <Link to='/donate'>
                                        <button type="button" className="btn btn-primary">
                                            Donate
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-md-7 add-right">
                                    <h2>Create Project Bio</h2>
                                    <div className="add-form">
                                        <div className="form-group">
                                            <input type="text" id='title' className="form-control" placeholder="Title" onChange = {this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control" id='description' placeholder="Description" onChange = {this.handleChange}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id='category' onChange = {this.handleChange} placeholder="Category"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id='goal' onChange = {this.handleChange} placeholder="Goal"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="file" className="form-control" id='image' onChange = {this.handleImageChange} placeholder="Goal"/>
                                        </div>
                                        <button type="button"  onClick = {this.handleSubmit} className="btn btn-primary">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state.auth)
    return {
        auth : state.auth.user,
        log_status : state.auth.log_status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadProject: (project) => dispatch(uploadProject(project))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProject)