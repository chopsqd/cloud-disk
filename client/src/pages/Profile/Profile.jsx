import {useDispatch, useSelector} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../api/user";
import './Profile.scss';
import {API_LINK} from "../../config";
import avatarLogo from "../../assets/avatar.png";

const Profile = () => {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)

    const changeHandler = event => {
        const file = event.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className={"profile"}>
            <div className={"profile__info"}>
                <img className={"profile__img"} src={currentUser.avatar ? `${API_LINK + currentUser.avatar}` : avatarLogo} alt="Avatar"/>
                <div className={"profile__description"}>
                    <div className={"btn btn-white"} onClick={() => dispatch(deleteAvatar())}>Удалить фото</div>
                    <label className={"btn btn-white"} htmlFor="profile-img__input">Загрузить фото</label>
                    <input
                        type="file"
                        className={"profile-img__input"}
                        id={"profile-img__input"}
                        accept={"image/*"}
                        onChange={changeHandler}
                        placeholder={"Загрузить аватар"}
                    />
                </div>
                <div className={"profile__description"}>
                    <div>Email: <b>{currentUser.email}</b></div>
                    <div>Диск заполнен на: <b>{(currentUser.usedSpace / currentUser.diskSpace).toFixed(2) * 100}%</b></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
