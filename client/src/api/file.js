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

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            if(dirId) {
                formData.append('parent', dirId)
            }

            const response = await axios.post(API_LINK + 'file/upload', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.event.lengthComputable ? progressEvent.event.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
                    if(totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                    }
                }
            })

            dispatch(addFile(response.data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}
