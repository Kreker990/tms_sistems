import toast from "react-hot-toast";
import { API_DRIVERS } from "../config";
import { GET_ORDER_BY_ID_DRIVER } from "../reducer/type";

export const getOrdersDriver = (token) => async (dispatch) => {
  try {
    const response = await fetch(API_DRIVERS + '/orders', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных о заказах');
    }
    const resData = await response.json();
    dispatch({
      type: GET_ORDER_BY_ID_DRIVER,
      payload: resData
    });
  } catch (error) {
    toast.error(error.message);
  }
};