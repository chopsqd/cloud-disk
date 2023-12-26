import {useSelector} from "react-redux";
import File from "../File/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import './FileList.scss'

const FileList = () => {
    const {files, view} = useSelector(state => state.file)

    if(!files.length) {
        return (
            <div className={"file-list-empty"}>Файлы не найдены</div>
        )
    }

    if(view === 'plate') {
        return (
            <div className={"file-plate"}>
                {files.map(file =>
                    <File key={file._id} file={file}/>
                )}
            </div>
        );
    }

    if(view === 'list') {
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
    }
};

export default FileList;
