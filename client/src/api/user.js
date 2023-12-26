import axios from "axios";
import {API_LINK} from "../config";
import {setAuthError, setUser} from "../store/reducers/userReducer";

export const registration = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(API_LINK + 'api/auth/registration', {
                email, password
            })
            alert(response.data.message)
        } catch (error) {
            dispatch(setAuthError(error.response.data.message))
        }
    }
}


export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(API_LINK + 'api/auth/login', {
                email, password
            })

            dispatch(setUser(response.data.user))
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            dispatch(setAuthError(error.response.data.message))
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(API_LINK + 'api/auth/auth', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(setUser(response.data.user))
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            console.log(error.response.data)
            localStorage.removeItem("token")
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await axios.post(API_LINK + 'api/file/avatar', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(setUser(response.data))
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(API_LINK + 'api/file/avatar', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(setUser(response.data))
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
