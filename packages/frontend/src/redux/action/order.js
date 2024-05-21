// redux/action/orders.js
import { GET_ORDERS, ADD_ORDER, UPDATE_ORDER, DELETE_ORDER, GET_ORDER } from "../reducer/type";
import { API_ORDERS } from "../config";
import toast from "react-hot-toast";

// Получение всех заказов
export const getOrders = () => async (dispatch) => {
    try {
        const response = await fetch(API_ORDERS);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных о заказах');
        }
        const resData = await response.json();
        dispatch({
            type: GET_ORDERS,
            payload: resData
        });
    } catch (error) {
        toast.error(error.message);
    }
};

// Получение одного заказа по ID
export const getOrder = (id) => async (dispatch) => {
    try {
        const response = await fetch(`${API_ORDERS}/${id}`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных о заказе');
        }
        const resData = await response.json();
        dispatch({
            type: GET_ORDER,
            payload: resData
        });
    } catch (error) {
        toast.error(error.message);
    }
};

// Добавление нового заказа
export const addOrder = (orderData) => async (dispatch) => {
    try {
        const response = await fetch(API_ORDERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            throw new Error('Не удалось добавить заказ');
        }
        const resData = await response.json();
        dispatch(getOrders());
        dispatch({
            type: ADD_ORDER,
            payload: resData,
        });
        toast.success(resData.message);
    } catch (error) {
        toast.error(error.message);
    }
};

// Обновление данных заказа
export const updateOrder = ({ orderId, updateData }) => async (dispatch) => {
    try {
        const response = await fetch(`${API_ORDERS}/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        if (!response.ok) {
            throw new Error('Не удалось обновить данные заказа');
        }
        const resData = await response.json();
        dispatch({
            type: UPDATE_ORDER,
            payload: resData.data,
        });
        toast.success(resData.message);
    } catch (error) {
        toast.error(error.message);
    }
};

// Удаление заказа
export const deleteOrder = (orderId) => async (dispatch) => {
    try {
        const response = await fetch(`${API_ORDERS}/${orderId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Не удалось удалить заказ');
        }
        dispatch({
            type: DELETE_ORDER,
            payload: orderId
        });
        toast.success('Заказ успешно удален!');
    } catch (error) {
        toast.error(error.message);
    }
};
