// redux/reducer/helpers.js
import { GET_COMPANIES_A, GET_COMPANIES_B, GET_DRIVER, GET_STAFF, GET_STATUS_ORDER } from "./type";

const initialState = {
    companiesA: [],
    companiesB: [],
    drivers: [],
    staff: [],
    statusOrders: [],
};

const helpersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPANIES_A:
            return {
                ...state,
                companiesA: action.payload
            };
        case GET_COMPANIES_B:
            return {
                ...state,
                companiesB: action.payload
            };
        case GET_DRIVER:
            return {
                ...state,
                drivers: action.payload
            };
        case GET_STAFF:
            return {
                ...state,
                staff: action.payload
            };
        case GET_STATUS_ORDER:
            return {
                ...state,
                statusOrders: action.payload
            };
        default:
            return state;
    }
};

export default helpersReducer;
