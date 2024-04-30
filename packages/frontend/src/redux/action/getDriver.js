import { GET_DRIVER, ADD_DRIVER, UPDATE_DRIVER, DELETE_DRIVER } from "../reducer/type";
import { API_DRIVERS } from "../config";

// Существующий экшен для получения водителей
export const getDriver = () => {
    return async (dispatch) => {
        const response = await fetch(API_DRIVERS);
        const resData = await response.json();
        console.log(resData);
        dispatch({
            type: GET_DRIVER,
            payload: resData
        });
    };
};

// Добавление нового водителя
export const addDriver = (driverData) => {
    return async (dispatch) => {
        const response = await fetch(API_DRIVERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driverData)
        });
        const resData = await response.json();
        dispatch({
            type: ADD_DRIVER,
            payload: resData
        });
    };
};

// Обновление данных водителя
export const updateDriver = (driverId, updateData) => {
    return async (dispatch) => {
        const response = await fetch(`${API_DRIVERS}/${driverId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        const resData = await response.json();
        dispatch({
            type: UPDATE_DRIVER,
            payload: resData
        });
    };
};

// Удаление водителя
export const deleteDriver = (driverId) => {
    return async (dispatch) => {
        await fetch(`${API_DRIVERS}/${driverId}`, {
            method: 'DELETE'
        });
        dispatch({
            type: DELETE_DRIVER,
            payload: driverId
        });
    };
};
