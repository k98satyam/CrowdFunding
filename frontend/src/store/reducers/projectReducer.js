const project = {
    projects: null,
    individualProject : null
} 

const projectReducer = (state = project, action) => {
    switch(action.type) {
        case 'UPLOAD_SUCCESS' :
            console.log("Project Uploaded successfully")
            return {
                ...state,
            }
        case 'UPLOAD_UNSUCCESSFUL' :
            console.log("upload failed")
            return {
                state
            }
        case 'LOAD_PROJECT' :
            console.log("Project Loaded Successfully")
            //console.log(action.response)
            return {
                projects: action.response
            }
        case 'LOAD_INDIVIDUAL_PROJECT' :
            console.log("Individual Project Loaded Successfully")
            //console.log(action.response)
            return {
                ...state,
                individualProject: action.response
            }
        case 'UPDATED_INDIVIDUAL_PROJECT_AMOUNT':
            console.log("UPDATED_INDIVIDUAL_PROJECT_AMOUNT")
            return {
                ...state
            }
        default :
            return state
    }
}

export default projectReducer