import {useEffect} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Authorization from "./pages/Authorization/Authorization";
import Disk from "./pages/Disk/Disk";
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
                {!isAuth ?
                    <Routes>
                        <Route path={"/registration"} element={<Authorization type={"registration"} />} />
                        <Route path={"/login"} element={<Authorization type={"login"} />} />
                        <Route path="*" element={<Navigate to="/login" replace />}/>
                    </Routes>
                    :
                    <Routes>
                        <Route path={"/"} element={<Disk />} />
                        <Route path="*" element={<Navigate to="/" replace />}/>
                    </Routes>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
