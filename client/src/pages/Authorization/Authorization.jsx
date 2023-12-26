import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../components/Input/Input";
import {login, registration} from "../../api/user";
import {setAuthError} from "../../store/reducers/userReducer";
import './Authorization.scss'

const Authorization = ({type}) => {
    const dispatch = useDispatch()
    const {authError} = useSelector(state => state.user)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        if(type === "login") {
            dispatch(login(email, password))
        } else {
            dispatch(registration(email, password))
        }
    }

    useEffect(() => {
        dispatch(setAuthError(''))
    }, [type])

    return (
        <div className={"authorization"}>
            <div className={"authorization__header"}>{type === "login" ? "Вход" : "Регистрация"}</div>

            {authError && (
                <div className={"authorization__error"}>{authError}</div>
            )}

            <Input value={email} setValue={setEmail} type={"text"} placeholder={"Введите Email..."} />
            <Input value={password} setValue={setPassword} type={"password"} placeholder={"Введите пароль..."} />

            <div className={"authorization__btn"} onClick={handleSubmit}>
                <a className={"btn"}>{type === "login" ? "Войти" : "Зарегистрироваться"}</a>
            </div>
        </div>
    );
};

export default Authorization;
