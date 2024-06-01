import { GET_DRIVER, ADD_DRIVER, UPDATE_DRIVER, DELETE_DRIVER } from "../reducer/type";
import { API_DRIVERS } from "../config";
import toast from "react-hot-toast";

export const getDriver = () => {
  return async (dispatch) => {
    const response = await fetch(API_DRIVERS);
    const resData = await response.json();

    dispatch({
      type: GET_DRIVER,
      payload: resData
    });
  };
};

export const addDriver = (driverData) => async (dispatch) => {
  try {
    const response = await fetch(API_DRIVERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(driverData)
    });
    const resData = await response.json();
    if (response.ok) {
      dispatch({
        type: ADD_DRIVER,
        payload: resData.data,
      });
      toast.success(resData.message);
    } else {
      toast.error(resData.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


// Обновление данных водителя
export const updateDriver = ({ driverId, updateData }) => async (dispatch) => {
  try {
    const response = await fetch(`${API_DRIVERS}/${driverId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    const resData = await response.json();
    if (response.ok) {
      dispatch({
        type: UPDATE_DRIVER,
        payload: resData.data,
      });
      toast.success(resData.message);
    } else {
      toast.error(resData.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

// Удаление водителя
export const deleteDriver = (driverId) => async (dispatch) => {
  try {
    await fetch(`${API_DRIVERS}/${driverId}`, {
      method: 'DELETE'
    });
    dispatch({
      type: DELETE_DRIVER,
      payload: driverId
    });
    toast.success('Водитель успешно удалён!');
  } catch (error) {
    toast.error(error.message);
  }
};
