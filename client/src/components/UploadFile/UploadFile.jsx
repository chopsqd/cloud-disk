import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../store/reducers/uploadReducer";
import './UploadFile.scss';

const UploadFile = ({file}) => {
    const dispatch = useDispatch()

    return (
        <div className={"upload-file"}>
            <div className={"upload-file__header"}>
                <div className={"upload-file__name"}>{file.name}</div>
                <button className={"btn btn-white upload-file__remove"} onClick={() => dispatch(removeUploadFile(file.id))}>&times;</button>
            </div>
            <div className={"upload-file__progress-bar"}>
                <div className={"upload-file__upload-bar"} style={{width: file.progress + "%"}}/>
                <div className={"upload-file__percent"}>{file.progress}%</div>
            </div>
        </div>
    );
};

export default UploadFile;
