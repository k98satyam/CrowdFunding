import React, { Component } from 'react'
import { loadIndivdualProject } from '../../store/actions/projectAction'
import { connect } from 'react-redux'
import Axios from 'axios'

class IndividualProject extends Component {
    // console.log(project)
    constructor(props) {
        super(props)
        this.state = {
            image: null
        }
        this.loadImage = this.loadImage.bind(this)
    }
    
    async componentDidMount() {
        await this.props.loadIndivdualProject(this.props.match.params.id)
    }

    loadImage = (id) => {
        console.log(id)
        Axios.post('http://localhost:3000/image/getimagebuffer',{id})
            .then(res => {
                console.log(res)
                const data = res.data.img.data
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = this.arrayBufferToBase64(data);
                this.setState({
                    image: base64Flag + imageStr
                })
            })
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    render(){
        if (this.props.project === null || this.props.project === undefined) {
            return (
                <div></div>
            )
        }
        else {
            // console.log(this.props.project.data)
            const project = this.props.project.data
            if (this.state.image === null){
                this.loadImage(this.props.project.data.imageID)
            }

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
                            <img src={ this.state.image } height="250" width="400"/>
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