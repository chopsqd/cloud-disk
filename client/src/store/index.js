import {applyMiddleware, combineReducers, createStore} from 'redux'
import {thunk} from "redux-thunk";
import userReducer from "./reducers/userReducer";
import fileReducer from "./reducers/fileReducer";
import uploadReducer from "./reducers/uploadReducer";
import appReducer from "./reducers/appReducer";

export const store = createStore(
    combineReducers({
        user: userReducer,
        file: fileReducer,
        upload: uploadReducer,
        app: appReducer
    }),
    applyMiddleware(thunk)
);
