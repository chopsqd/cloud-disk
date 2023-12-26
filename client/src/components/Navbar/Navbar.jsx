import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/reducers/userReducer";
import './Navbar.scss'
import {useState} from "react";
import {getFiles, searchFiles} from "../../api/file";
import {toggleLoader} from "../../store/reducers/appReducer";

const Navbar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.file.currentDir)
    const [search, setSearch] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(false);

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
            <div className={"navbar__header"}>MERN CLOUD</div>

            {!isAuth
                ? <>
                    <div className={"navbar__login"}>
                        <NavLink to={"/login"}>Войти</NavLink>
                    </div>
                    <div className={"navbar__registration"}>
                        <NavLink to={"/registration"}>Регистрация</NavLink>
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
                    <div className={"navbar__logout"} onClick={() => dispatch(logout())}>Выйти</div>
                </>
            }
        </div>
    );
};

export default Navbar;
