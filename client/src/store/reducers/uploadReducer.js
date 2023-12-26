const TOGGLE_UPLOADER = "TOGGLE_UPLOADER"
const ADD_UPLOAD_FILE = "ADD_UPLOAD_FILE"
const REMOVE_UPLOAD_FILE = "REMOVE_UPLOAD_FILE"
const CHANGE_UPLOAD_FILE = "CHANGE_UPLOAD_FILE"

const initialState = {
    isVisible: false,
    files: []
}

export default function uploadReducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_UPLOADER:
            return {
                ...state,
                isVisible: action.payload
            }
        case ADD_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        case REMOVE_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files.filter(file => file.id !== action.payload)]
            }
        case CHANGE_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files.map(file => file.id === action.payload.id
                    ? {...file, progress: action.payload.progress}
                    : file
                )]
            }
        default:
            return state
    }
}


export const toggleUploader = value => ({type: TOGGLE_UPLOADER, payload: value})
export const addUploadFile = file => ({type: ADD_UPLOAD_FILE, payload: file})
export const removeUploadFile = fileId => ({type: REMOVE_UPLOAD_FILE, payload: fileId})
export const changeUploadFile = payload => ({type: CHANGE_UPLOAD_FILE, payload})
