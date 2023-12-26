import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/reducers/userReducer";
import {useState} from "react";
import {getFiles, searchFiles} from "../../api/file";
import {toggleLoader} from "../../store/reducers/appReducer";
import avatarLogo from '../../assets/avatar.png'
import {API_LINK} from "../../config";
import './Navbar.scss'

const Navbar = () => {
    const dispatch = useDispatch()
    const {isAuth, currentUser} = useSelector(state => state.user)
    const currentDir = useSelector(state => state.file.currentDir)
    const [search, setSearch] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(false);
    const avatar = currentUser.avatar ? `${API_LINK + currentUser.avatar}` : avatarLogo

    const searchHandler = event => {
        setSearch(event.target.value)
        if(searchTimeout) {
            clearTimeout(searchTimeout)
        }
        dispatch(toggleLoader(true))
        if(event.target.value) {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value))
            }, 500, event.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className={"navbar"}>
            <div className={"navbar__logo"}>
                <NavLink to={"/"}>
                    <p>MERN CLOUD</p>
                </NavLink>
            </div>

            {!isAuth
                ? <>
                    <div className={"navbar__login"}>
                        <NavLink to={"/login"} className={"btn"}>Войти</NavLink>
                    </div>
                    <div className={"navbar__registration"}>
                        <NavLink to={"/registration"} className={"btn"}>Регистрация</NavLink>
                    </div>
                </>
                :
                <>
                    <input
                        type="text"
                        value={search}
                        onChange={searchHandler}
                        className={"navbar__search"}
                        placeholder={"Название файла..."}
                    />
                    <div className={"btn navbar__logout"} onClick={() => dispatch(logout())}>Выйти</div>
                    <NavLink to={'/profile'}>
                        <img className={"navbar__avatar"} src={avatar} alt="Avatar"/>
                    </NavLink>
                </>
            }
        </div>
    );
};

export default Navbar;
