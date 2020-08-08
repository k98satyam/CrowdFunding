const initState = {
    authErr: null,
    user: null,
    log_status: false
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS' :
            console.log('LogIn Success')
            return {
                authErr : null,
                user: action.user,
                log_status: true   
            }

        case 'LOGIN_ERROR' :
            console.log('LogIn Error')
            return {
                authErr : 'Log In Error  ' + action.err,
                user: null,
                log_status: false
            }

        case 'LOGOUT_SUCCESS' :
            console.log('LogOut Success')
            return {
                authErr : null,
                user: null,
                log_status: false
            }

        default :
            return state
    }
}

export default authReducer