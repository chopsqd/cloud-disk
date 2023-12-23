import dirLogo from '../../assets/dir.svg';
import fileLogo from '../../assets/file.svg';
import './File.scss';

const File = ({file}) => {
    return (
        <div className={"file"}>
            <img src={file.type === "dir" ? dirLogo : fileLogo} alt={file.name} className={"file__img"}/>
            <div className={"file__name"}>{file.name}</div>
            <div className={"file__date"}>{new Date(file.date).toLocaleDateString()}</div>
            <div className={"file__size"}>{file.size}</div>
        </div>
    );
};

export default File;
