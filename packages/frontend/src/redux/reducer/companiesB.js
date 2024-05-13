// reducers/companiesA.js
import { GET_COMPANIES_B, ADD_COMPANIES_B, UPDATE_COMPANIES_B, DELETE_COMPANIES_B } from "./type";

const initialState = [];

const companiesBReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPANIES_B:
            return [...action.payload];
        case ADD_COMPANIES_B:
            return [...state, action.payload];
        case UPDATE_COMPANIES_B:
            return state.map(driver =>
                driver.id === action.payload.id ? action.payload : driver
            );
        case DELETE_COMPANIES_B:
            return state.filter(driver => driver.id !== action.payload);
        default:
            return state;
    }
};

export default companiesBReducer;
