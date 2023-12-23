const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const initialState = {
    currentUser: {},
    isAuth: false
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
        default:
            return state
    }
}


export const setUser = user => ({type: LOGIN, payload: user})
export const logout = () => ({type: LOGOUT})
