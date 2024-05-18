// redux/reducer/orders.js
import { GET_ORDERS, ADD_ORDER, UPDATE_ORDER, DELETE_ORDER, GET_ORDER } from "./type";

const initialState = {
    orders: [],
    order: null
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case GET_ORDER:
            return {
                ...state,
                order: action.payload
            };
        case ADD_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.payload]
            };
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                )
            };
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => order.id !== action.payload)
            };
        default:
            return state;
    }
};

export default ordersReducer;
