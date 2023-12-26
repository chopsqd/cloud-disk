import {useSelector} from "react-redux";
import File from "../File/File";
import './FileList.scss'
import {CSSTransition, TransitionGroup} from "react-transition-group";

const FileList = () => {
    const files = useSelector(state => state.file.files)

    if(!files.length) {
        return (
            <div className={"file-list-empty"}>Файлы не найдены</div>
        )
    }

    return (
        <div className={"file-list"}>
            <div className={"file-list__header"}>
                <div className={"file-list__name"}>Название</div>
                <div className={"file-list__date"}>Дата</div>
                <div className={"file-list__size"}>Размер</div>
            </div>

            <TransitionGroup>
                {files.map(file =>
                    <CSSTransition
                        key={file._id}
                        timeout={500}
                        classNames={"file"}
                        exit={false}
                    >
                        <File file={file}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default FileList;
