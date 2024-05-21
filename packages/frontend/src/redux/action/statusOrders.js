// actions/companiesA.js
import { GET_STATUS_ORDER, ADD_STATUS_ORDER, UPDATE_STATUS_ORDER, DELETE_STATUS_ORDER } from "../reducer/type";
import { API_STATUS_ORDER } from "../config";
import toast from "react-hot-toast";

// Получение всех статусов заказа из `status order`
export const getStatusOrder = () => async (dispatch) => {
  try {
    const response = await fetch(API_STATUS_ORDER);
    const resData = await response.json();

    dispatch({
      type: GET_STATUS_ORDER,
      payload: resData
    });
  } catch (error) {
    toast.error(error.message);
  }
};

// Добавление нового статуса заказа в `status order`
export const addStatusOrder = (formData) => async (dispatch) => {
  try {
    const response = await fetch(API_STATUS_ORDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const resData = await response.json();
    dispatch({
      type: ADD_STATUS_ORDER,
      payload: resData.data,
    });
    toast.success(resData.message);
  } catch (error) {
    toast.error(error.message);
  }
};

// Обновление данных статуса заказа в `status order`
export const updateStatusOrder = ({ id, updateData }) => async (dispatch) => {
  try {
    const response = await fetch(`${API_STATUS_ORDER}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    const resData = await response.json();
    dispatch({
      type: UPDATE_STATUS_ORDER,
      payload: resData.data,
    });
    toast.success(resData.message);
  } catch (error) {
    toast.error(error.message);
  }
};

// Удаление статуса из `status order`
export const deleteStatusOrder = (id) => async (dispatch) => {
  try {
    await fetch(`${API_STATUS_ORDER}/${id}`, {
      method: 'DELETE'
    });
    dispatch({
      type: DELETE_STATUS_ORDER,
      payload: id
    });
    toast.success('Статус заказа успешно удалена!');
  } catch (error) {
    toast.error(error.message);
  }
};
