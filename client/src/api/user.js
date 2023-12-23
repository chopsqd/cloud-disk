import axios from "axios";
import {API_LINK} from "../config";
import {setUser} from "../store/reducers/userReducer";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(API_LINK + 'auth/registration', {
            email, password
        })
        alert(response.data.message)
    } catch (error) {
        alert(error.response.data.message)
    }
}


export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(API_LINK + 'auth/login', {
                email, password
            })

            dispatch(setUser(response.data.user))
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(API_LINK + 'auth/auth', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(setUser(response.data.user))
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error.response.data.message)
            localStorage.removeItem("token")
        }
    }
}
