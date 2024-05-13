// actions/staff.js
import { GET_STAFF, ADD_STAFF, UPDATE_STAFF, DELETE_STAFF } from "../reducer/type";
import { API_STAFF } from "../config";
import toast from "react-hot-toast";

// Получение всех сотрудников
export const getStaff = () => async (dispatch) => {
    try {
        const response = await fetch(API_STAFF);
        const resData = await response.json();

        dispatch({
            type: GET_STAFF,
            payload: resData
        });
    } catch (error) {
        toast.error(error.message);
    }
};

// Добавление нового сотрудника
export const addStaff = (staffData) => async (dispatch) => {
    try {
        const response = await fetch(API_STAFF, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(staffData)
        });
        if (!response.ok) {
            throw new Error('Не удалось добавить сотрудника');
        }
        const resData = await response.json();
        localStorage.setItem('tmsToken', JSON.stringify(resData.token));
        dispatch({
            type: ADD_STAFF,
            payload: resData,
        });
        toast.success('Сотрудник успешно добавлен');
    } catch (error) {
        toast.error(error.message);
    }
};

// Обновление данных сотрудника
export const updateStaff = ({ staffId, updateData }) => async (dispatch) => {
    try {
        const response = await fetch(`${API_STAFF}/${staffId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        const resData = await response.json();
        dispatch({
            type: UPDATE_STAFF,
            payload: resData.data,
        });
        toast.success(resData.message);
    } catch (error) {
        toast.error(error.message);
    }
};

// Удаление сотрудника
export const deleteStaff = (staffId) => async (dispatch) => {
    try {
        await fetch(`${API_STAFF}/${staffId}`, {
            method: 'DELETE'
        });
        dispatch({
            type: DELETE_STAFF,
            payload: staffId
        });
        toast.success('Сотрудник успешно удален!');
    } catch (error) {
        toast.error(error.message);
    }
};
