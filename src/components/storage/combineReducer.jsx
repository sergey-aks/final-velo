import { combineReducers } from "redux";
import { casesReducer } from "./casesReducer";
import { officersReducer } from "./officersReducer";
import { authReducer } from "./authReducer"

export const combineReducer = combineReducers({
    casesReducer,
    officersReducer,
    authReducer,
});