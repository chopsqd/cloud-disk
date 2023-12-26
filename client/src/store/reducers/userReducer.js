const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const SET_AUTH_ERROR = "SET_AUTH_ERROR"

const initialState = {
    currentUser: {},
    isAuth: false,
    authError: ''
}

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem("token")
            return {
                ...state,
                currentUser: {},
                isAuth: null
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                authError: action.payload
            }
        default:
            return state
    }
}


export const setUser = user => ({type: LOGIN, payload: user})
export const logout = () => ({type: LOGOUT})
export const setAuthError = error => ({type: SET_AUTH_ERROR, payload: error})
