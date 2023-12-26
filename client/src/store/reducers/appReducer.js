const TOGGLE_LOADER = "TOGGLE_LOADER"

const initialState = {
    loading: false
}

export default function appReducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_LOADER:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}


export const toggleLoader = value => ({type: TOGGLE_LOADER, payload: value})
