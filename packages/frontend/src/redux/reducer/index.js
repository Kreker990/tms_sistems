import { combineReducers } from "redux";
import getCheckAdmin from "./authorizedR";
import getDriverR from "./getDriverR";
import companiesA from './companiesA';
import companiesB from './companiesB';
import staffReducer from "./staff";
import ordersReducer from "./order";
import helpersReducer from './helpers'

export const rootReducer = combineReducers({
    authorized: getCheckAdmin,
    drivers: getDriverR,
    companiesA: companiesA,
    companiesB: companiesB,
    staff: staffReducer,
    orders: ordersReducer,
    helpers: helpersReducer,
})