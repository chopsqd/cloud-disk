import {applyMiddleware, combineReducers, createStore} from 'redux'
import userReducer from "./reducers/userReducer";
import fileReducer from "./reducers/fileReducer";
import {thunk} from "redux-thunk";

export const store = createStore(
    combineReducers({
        user: userReducer,
        file: fileReducer
    }),
    applyMiddleware(thunk)
);
