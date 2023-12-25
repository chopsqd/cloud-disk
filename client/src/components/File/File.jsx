import dirLogo from '../../assets/dir.svg';
import fileLogo from '../../assets/file.svg';
import './File.scss';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../store/reducers/fileReducer";
import {deleteFile, downloadFile} from "../../api/file";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)

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

    return (
        <div className={"file"} onClick={() => openDirHandler(file)}>
            <img src={file.type === "dir" ? dirLogo : fileLogo} alt={file.name} className={"file__img"}/>
            <div className={"file__name"}>{file.name}</div>
            <div className={"file__date"}>{new Date(file.date).toLocaleDateString()}</div>
            <div className={"file__size"}>{file.size}</div>

            {file.type !== "dir" && <button className={"file__btn file__download"} onClick={downloadHandler}>Скачать</button>}
            <button onClick={deleteHandler} className={"file__btn file__delete"}>Удалить</button>
        </div>
    );
};

export default File;
