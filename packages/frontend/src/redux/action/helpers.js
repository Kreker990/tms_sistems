// redux/action/helpers.js
import { GET_COMPANIES_A, GET_COMPANIES_B, GET_DRIVER, GET_STAFF, GET_STATUS_ORDER } from "../reducer/type";
import { API_COMPANIES_A, API_COMPANIES_B, API_DRIVERS, API_STAFF, API_STATUS_ORDER } from "../config";
import toast from "react-hot-toast";

// Получение всех точек доставки A
export const getCompaniesA = () => async (dispatch) => {
    try {
        const response = await fetch(API_COMPANIES_A);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных о точках доставки A');
        }
        const resData = await response.json();
        dispatch({
            type: GET_COMPANIES_A,
            payload: resData
        });
    } catch (error) {
        toast.error(error.message);
    }
};

// Получение всех точек доставки B
export const getCompaniesB = () => async (dispatch) => {
    try {
        const response = await fetch(API_COMPANIES_B);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных о точках доставки B');
        }
        const resData = await response.json();
        dispatch({
            type: GET_COMPANIES_B,
            payload: resData
        });
    } catch (error) {
        toast.error(error.message);
    }
};

// Получение всех водителей
export const getDrivers = () => async (dispatch) => {
    try {
        const response = await fetch(API_DRIVERS);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных о водителях');
        }
        const resData = await response.json();
        dispatch({
            type: GET_DRIVER,
            payload: resData
        });
    } catch (error) {
        toast.error(error.message);
    }
};

// Получение всех менеджеров (персонала)
export const getStaff = () => async (dispatch) => {
    try {
        const response = await fetch(API_STAFF);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных о персонале');
        }
        const resData = await response.json();
        dispatch({
            type: GET_STAFF,
            payload: resData
        });
    } catch (error) {
        toast.error(error.message);
    }
};

// Получение статусов заказа
export const getStatusOrder = () => async (dispatch) => {
    try {
        const response = await fetch(API_STATUS_ORDER);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных о статусах заказа');
        }
        const resData = await response.json();
        console.log(resData)
        dispatch({
            type: GET_STATUS_ORDER,
            payload: resData
        });
    } catch (error) {
        toast.error(error.message);
    }
};
