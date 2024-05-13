// reducers/staff.js
import { GET_STAFF, ADD_STAFF, UPDATE_STAFF, DELETE_STAFF } from "../reducer/type";

const initialState = [];

const staffReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STAFF:
            return [...action.payload];
        case ADD_STAFF:
            return [...state, action.payload];
        case UPDATE_STAFF:
            return state.map(user =>
                user.id === action.payload.id ? action.payload : user
            );
        case DELETE_STAFF:
            return state.filter(user => user.id !== action.payload);
        default:
            return state;
    }
};

export default staffReducer;
