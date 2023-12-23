import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Authorization from "./pages/Authorization/Authorization";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "./api/user";

const App = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)

    useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <BrowserRouter>
            <div className={"container"}>
                <Navbar />
                {!isAuth &&
                    <Routes>
                        <Route path={"/registration"} element={<Authorization type={"registration"} />} />
                        <Route path={"/login"} element={<Authorization type={"login"} />} />
                    </Routes>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
