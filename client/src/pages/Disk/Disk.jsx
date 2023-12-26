import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getFiles, uploadFile} from "../../api/file";
import FileList from "../../components/FileList/FileList";
import Popup from "../../components/Popup/Popup";
import {setCurrentDir, setPopupDisplay, setView} from "../../store/reducers/fileReducer";
import Uploader from "../../components/Uploader/Uploader";
import Loader from "../../components/Loader/Loader";
import './Disk.scss';

const Disk = () => {
    const dispatch = useDispatch()
    const {currentDir, dirStack, view} = useSelector(state => state.file)
    const loading = useSelector(state => state.app.loading)
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState("type")

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    const showPopupHandler = () => {
        dispatch(setPopupDisplay('flex'))
    }

    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    const fileUploadHandler = (event) => {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    const dragEnterHandler = event => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = event => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    if(loading) {
        return <Loader />
    }

    return !dragEnter ?
        <div className={"disk"} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className={"disk__btns"}>
                <button className={"disk__back"} onClick={backClickHandler}>Назад</button>
                <button className={"disk__create"} onClick={showPopupHandler}>Создать папку</button>
                <div className={"disk__upload"}>
                    <label htmlFor={"disk__upload-input"} className={"disk__upload-label"}>Загрузить файл</label>
                    <input multiple={true} onChange={fileUploadHandler} type="file" id={"disk__upload-input"} className={"disk__upload-input"}/>
                </div>

                <select value={sort} className={"disk__select"} onChange={e => setSort(e.target.value)}>
                    <option value="name">Наименование</option>
                    <option value="type">Тип</option>
                    <option value="date">Дата</option>
                </select>

                <button className={`disk__plate ${view === 'plate' ? 'active' : ''}`} onClick={() => dispatch(setView('plate'))}/>
                <button className={`disk__list ${view === 'list' ? 'active' : ''}`} onClick={() => dispatch(setView('list'))}/>
            </div>

            <FileList />
            <Popup />
            <Uploader />
        </div>
        :
        <div className={"drop-area"} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            Перетащите файлы сюда
        </div>
};

export default Disk;
