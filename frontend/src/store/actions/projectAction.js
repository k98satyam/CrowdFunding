import axios from "axios"

export const uploadProject = (project) => {
    return (dispatch, getState) => {
        axios.post("http://localhost:3000/project/create/", project)
            .then((res) => {
                dispatch({type : 'UPLOAD_SUCCESS'})
            })
    }
}

export const loadProject = () => {
    return (dispatch, getState) => {
        axios.get("http://localhost:3000/project/")
            .then(response => { 
                // console.log(response)
                dispatch({ type : 'LOAD_PROJECT', response}) 
            })
    }
}

export const loadIndivdualProject = (id) => {
    return (dispatch, getState) => {
        axios.get(`http://localhost:3000/project/${id}`)
            .then(response => { 
                // console.log(response)
                dispatch({ type : 'LOAD_INDIVIDUAL_PROJECT', response}) 
            })
    }
}

export const updateRecivedAmount = (id,newDonatedAmount) => {
    return (dispatch, getState) => {
        axios.post(`http://localhost:3000/project/updateRecived`, { id, newDonatedAmount })
            .then(response => { 
                // console.log(response)
                dispatch({ type : 'UPDATED_INDIVIDUAL_PROJECT_AMOUNT', response}) 
            })
    }
}