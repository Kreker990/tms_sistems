import { GET_ORDER_BY_ID_DRIVER } from "../reducer/type";

const initialState = [];

const getOrderByIdDriver = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_BY_ID_DRIVER:
      return action.payload;
    default:
      return state;
  }
};

export default getOrderByIdDriver;