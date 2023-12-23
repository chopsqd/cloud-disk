import './Authorization.scss'
import Input from "../../components/Input/Input";
import {useState} from "react";
import {login, registration} from "../../api/user";
import {useDispatch} from "react-redux";

const Authorization = ({type}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();

    const handleSubmit = () => {
        if(type === "login") {
            dispatch(login(email, password))
        } else {
            registration(email, password)
        }
    }

    return (
        <div className={"authorization"}>
            <div className={"authorization__header"}>{type === "login" ? "Вход" : "Регистрация"}</div>

            <Input value={email} setValue={setEmail} type={"text"} placeholder={"Введите Email..."} />
            <Input value={password} setValue={setPassword} type={"password"} placeholder={"Введите пароль..."} />

            <button className={"authorization__btn"} onClick={handleSubmit}>{type === "login" ? "Войти" : "Зарегистрироваться"}</button>
        </div>
    );
};

export default Authorization;
