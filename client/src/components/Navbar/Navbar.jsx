import './Navbar.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/reducers/userReducer";

const Navbar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)

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
                : <div className={"navbar__logout"} onClick={() => dispatch(logout())}>Выйти</div>
            }
        </div>
    );
};

export default Navbar;
