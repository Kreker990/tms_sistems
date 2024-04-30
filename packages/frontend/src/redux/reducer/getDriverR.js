import { GET_DRIVER, ADD_DRIVER, UPDATE_DRIVER, DELETE_DRIVER } from "./type";

const initialState = [];

const driverReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRIVER:
            return [...action.payload];
        case ADD_DRIVER:
            return [...state, action.payload];
        case UPDATE_DRIVER:
            return state.map(driver =>
                driver.id === action.payload.id ? action.payload : driver
            );
        case DELETE_DRIVER:
            return state.filter(driver => driver.id !== action.payload);
        default:
            return state;
    }
};

export default driverReducer;
