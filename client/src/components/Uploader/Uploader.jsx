import './Uploader.scss';
import UploadFile from "../UploadFile/UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {toggleUploader} from "../../store/reducers/uploadReducer";

const Uploader = () => {
    const dispatch = useDispatch()
    const {isVisible, files} = useSelector(state => state.upload)

    const handleClose = () => {
        dispatch(toggleUploader(false))
    }

    return ( isVisible &&
        <div className={"uploader"}>
            <div className={"uploader__header"}>
                <div className={"uploader__title"}>Загрузки</div>
                <button className={"uploader__close"} onClick={handleClose}>&times;</button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file} />
            )}
        </div>
    );
};

export default Uploader;
