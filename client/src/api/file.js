import axios from "axios";
import {API_LINK} from "../config";
import {addFile, setFiles} from "../store/reducers/fileReducer";

export function getFiles(dirId) {
    return async dispatch => {
        try {
            const response = await axios.get(API_LINK + 'file', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    parent: dirId
                }
            })

            dispatch(setFiles(response.data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

export function mkDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(API_LINK + 'file', {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(addFile(response.data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}
