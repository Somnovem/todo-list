import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer} from "./reducer";

export const taskStore = combineReducers({
    projects: reducer
})

export const store = createStore(taskStore,applyMiddleware(thunk));
