import { combineReducers } from "redux";
import getCheckAdmin from "./authorizedR";

export const rootReducer = combineReducers({
    authorized: getCheckAdmin,
    
})