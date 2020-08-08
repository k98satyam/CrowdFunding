import React from 'react'
import { Link } from 'react-router-dom'

const DisplayProject = ({ project }) => {
    // console.log(project)
    return (
        <div className='roww'>
            <div className='leftcolumn'>
                <div className="caard">
                    {/* if We use open in new tab then for some reason we dont get that project onject  */}
                    <Link to={{ pathname: `/indvProject/${project._id}`, project: project }}>{ project.projectTitle }</Link>
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

export default DisplayProject