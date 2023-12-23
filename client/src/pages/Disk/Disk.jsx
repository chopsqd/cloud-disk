import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getFiles} from "../../api/file";
import FileList from "../../components/FileList/FileList";
import './Disk.scss';
import Popup from "../../components/Popup/Popup";
import {setPopupDisplay} from "../../store/reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    const showPopupHandler = () => {
        dispatch(setPopupDisplay('flex'))
    }

    return (
        <div className={"disk"}>
            <div className={"disk__btns"}>
                <button className={"disk__back"}>Назад</button>
                <button className={"disk__create"} onClick={showPopupHandler}>Создать папку</button>
            </div>

            <FileList />

            <Popup />
        </div>
    );
};

export default Disk;
