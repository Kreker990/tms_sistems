// reducers/companiesA.js
import { GET_STATUS_ORDER, ADD_STATUS_ORDER, UPDATE_STATUS_ORDER, DELETE_STATUS_ORDER } from "../reducer/type";

const initialState = [];

const statusOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATUS_ORDER:
      return [...action.payload];
    case ADD_STATUS_ORDER:
      return [...state, action.payload];
    case UPDATE_STATUS_ORDER:
      return state.map(el =>
        el.id === action.payload.id ? action.payload : el
      );
    case DELETE_STATUS_ORDER:
      return state.filter(el => el.id !== action.payload);
    default:
      return state;
  }
};

export default statusOrderReducer;
