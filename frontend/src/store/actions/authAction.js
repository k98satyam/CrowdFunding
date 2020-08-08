import axios from "axios";

export const signIn = () => {
    return (dispatch, getState) => {
        fetch("http://localhost:3000/auth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        }).then(response => {
            if (response.status === 200) return response.json();
            dispatch({type : "LOGIN_ERROR", err : "unable to authenticate"})
        })
        .then(responseJson => {
            dispatch({type : "LOGIN_SUCCESS", user : responseJson.user})
        })
    }
}

export const logOut = () => {
    return (dispatch,getState) => {
        window.open("http://localhost:3000/auth/logout","_self")
        dispatch({type : "LOGOUT_SUCCESS"})        
    } 
}