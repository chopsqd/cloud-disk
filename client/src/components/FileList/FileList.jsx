import {useSelector} from "react-redux";
import File from "../File/File";
import './FileList.scss'

const FileList = () => {
    const files = useSelector(state => state.file.files)

    return (
        <div className={"file-list"}>
            <div className={"file-list__header"}>
                <div className={"file-list__name"}>Название</div>
                <div className={"file-list__date"}>Дата</div>
                <div className={"file-list__size"}>Размер</div>
            </div>

            {files.map(file =>
                <File key={file.id} file={file} />
            )}
        </div>
    );
};

export default FileList;
