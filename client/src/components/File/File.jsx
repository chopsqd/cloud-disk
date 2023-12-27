import dirLogo from '../../assets/dir.svg';
import fileLogo from '../../assets/file.svg';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../store/reducers/fileReducer";
import {deleteFile, downloadFile} from "../../api/file";
import sizeFormat from "../../utils/sizeFormat";
import './File.scss';

const File = ({file}) => {
    const dispatch = useDispatch()
    const {currentDir, view} = useSelector(state => state.file)

    const openDirHandler = (file) => {
        if (file.type === "dir") {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    const downloadHandler = event => {
        event.stopPropagation()
        downloadFile(file)
    }

    const deleteHandler = event => {
        event.stopPropagation()
        dispatch(deleteFile(file))
    }

    if(view === 'list') {
        return (
            <div className={"file-item-list"} onClick={() => openDirHandler(file)}>
                <img src={file.type === "dir" ? dirLogo : fileLogo} alt={file.name} className={"file-item-list__img"}/>
                <div className={"file-item-list__name"}>{file.name}</div>
                <div className={`file-item-list__${file.type === "dir" ? "date-dir" : "date-file"}`}>{new Date(file.date).toLocaleDateString()}</div>
                {file.type !== "dir" && <div className={"file-item-list__size"}>{sizeFormat(file.size)}</div>}

                {file.type !== "dir" && <button className={"btn btn-white file-item-list__btn file-item-list__download"} onClick={downloadHandler}>Скачать</button>}
                <button onClick={deleteHandler} className={"btn btn-white file-item-list__btn file-item-list__delete"}>Удалить</button>
            </div>
        );
    }

    if(view === 'plate') {
        return (
            <div className={"file-item-plate"} onClick={() => openDirHandler(file)}>
                <img src={file.type === "dir" ? dirLogo : fileLogo} alt={file.name} className={"file-item-plate__img"}/>
                <div className={"file-item-plate__name"}>{file.name}</div>

                <div className={"file-item-plate__btns"}>
                    {file.type !== "dir" && <button className={"btn btn-white file-item-plate__btn file-item-plate__download"} onClick={downloadHandler}>Скачать</button>}
                    <button onClick={deleteHandler} className={"btn btn-white file-item-plate__btn file-item-plate__delete"}>Удалить</button>
                </div>
            </div>
        );
    }
};

export default File;
