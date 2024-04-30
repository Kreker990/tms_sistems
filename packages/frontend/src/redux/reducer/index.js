import { combineReducers } from "redux";
import getCheckAdmin from "./authorizedR";
import getDriverR from "./getDriverR";

export const rootReducer = combineReducers({
    authorized: getCheckAdmin,
    drivers: getDriverR,
})