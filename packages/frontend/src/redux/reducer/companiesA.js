// reducers/companiesA.js
import { GET_COMPANIES_A, ADD_COMPANIES_A, UPDATE_COMPANIES_A, DELETE_COMPANIES_A } from "../reducer/type";

const initialState = [];

const companiesAReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPANIES_A:
            return [...action.payload];
        case ADD_COMPANIES_A:
            return [...state, action.payload];
        case UPDATE_COMPANIES_A:
            return state.map(driver =>
                driver.id === action.payload.id ? action.payload : driver
            );
        case DELETE_COMPANIES_A:
            return state.filter(driver => driver.id !== action.payload);
        default:
            return state;
    }
};

export default companiesAReducer;
