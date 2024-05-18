// redux/reducer/helpers.js
import { GET_COMPANIES_A, GET_COMPANIES_B, GET_DRIVER, GET_STAFF } from "./type";

const initialState = {
    companiesA: [],
    companiesB: [],
    drivers: [],
    staff: []
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
        default:
            return state;
    }
};

export default helpersReducer;
