import React, { Component } from 'react'
import { loadIndivdualProject } from '../../store/actions/projectAction'
import { connect } from 'react-redux'

class IndividualProject extends Component {
    // console.log(project)
    componentDidMount() {
        this.props.loadIndivdualProject(this.props.match.params.id)
    }
    render(){
        if (this.props.project === null || undefined) {
            return (
                null
            )
        }
        else {
            //console.log(this.props.project.data)
            const project = this.props.project.data
            return (
                <div className='roww'>
                    <div className='leftcolumn'>
                        <div className="caard">
                            <h1>{ project.projectTitle }</h1>
                            <h5>Description : </h5>
                            <p>{ project.description } </p>
                            <h5>Project Goal(In Ether) : { project.goal } </h5>
                            <h5>Uploaded by : { project.authorName }</h5>
                            <h5>Recived Donation(In Ether) : { project.recived } </h5>
                            {/* <img src={ project.url } height="250" width="400"/> */}
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    //console.log(state.project)
    return {
        project: state.project.individualProject
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadIndivdualProject: (id) => dispatch(loadIndivdualProject(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(IndividualProject)