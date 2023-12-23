import Input from "../Input/Input";
import {useState} from "react";
import './Popup.scss';
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../store/reducers/fileReducer";
import {mkDir} from "../../api/file";

const Popup = () => {
    const dispatch = useDispatch()
    const {popupDisplay, currentDir} = useSelector(state => state.file)
    const [dirName, setDirName] = useState("");

    const handleClose = () => {
        dispatch(setPopupDisplay('none'))
    }

    const handleCreate = () => {
        dispatch(mkDir(currentDir, dirName))
        dispatch(setPopupDisplay('none'))
        setDirName("")
    }

    return (
        <div className={"popup"} onClick={handleClose} style={{display: popupDisplay}}>
            <div className={"popup__content"} onClick={event => event.stopPropagation()}>
                <div className={"popup__header"}>
                    <div className={"popup__title"}>Создать новую папку</div>
                    <button className={"popup__close"} onClick={handleClose}>&times;</button>
                </div>

                <Input
                    type={"text"}
                    value={dirName}
                    setValue={setDirName}
                    placeholder={"Название папки..."}
                />

                <button className={"popup__create"} onClick={handleCreate}>Создать</button>
            </div>
        </div>
    );
};

export default Popup;
