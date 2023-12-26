import axios from "axios";
import {API_LINK} from "../config";
import {addFile, deleteFileAction, setFiles} from "../store/reducers/fileReducer";
import {addUploadFile, changeUploadFile, toggleUploader} from "../store/reducers/uploadReducer";
import {toggleLoader} from "../store/reducers/appReducer";

export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(toggleLoader(true))
            const response = await axios.get(API_LINK + 'api/file', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    parent: dirId,
                    sort
                }
            })

            dispatch(setFiles(response.data))
        } catch (error) {
            console.log(error.response.data)
        } finally {
            dispatch(toggleLoader(false))
        }
    }
}

export function mkDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(API_LINK + 'api/file', {
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
            console.log(error.response.data)
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

            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(toggleUploader(true))
            dispatch(addUploadFile(uploadFile))
            const response = await axios.post(API_LINK + 'api/file/upload', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.event.lengthComputable ? progressEvent.event.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
                    if(totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            })

            dispatch(addFile(response.data))
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export async function downloadFile(file) {
    const response = await fetch(API_LINK + `api/file/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    })

    if(response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(API_LINK + `api/file?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(API_LINK + `api/file/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(setFiles(response.data))
        } catch (error) {
            console.log(error.response.data)
        } finally {
            dispatch(toggleLoader(false))
        }
    }
}
