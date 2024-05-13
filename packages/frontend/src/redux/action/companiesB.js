// actions/companiesA.js
import { GET_COMPANIES_B, ADD_COMPANIES_B, UPDATE_COMPANIES_B, DELETE_COMPANIES_B } from "../reducer/type";
import { API_COMPANIES_B } from "../config";
import toast from "react-hot-toast";

// Получение всех компаний из `CompaniesA`
export const getCompaniesB = () => async (dispatch) => {
    try {
        const response = await fetch(API_COMPANIES_B);
        const resData = await response.json();

        dispatch({
            type: GET_COMPANIES_B,
            payload: resData
        });
    } catch (error) {
        toast.error(error.message);
    }
};

// Добавление новой компании в `CompaniesA`
export const addCompanyB = (companyData) => async (dispatch) => {
    try {
        const response = await fetch(API_COMPANIES_B, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData)
        });
        const resData = await response.json();
        dispatch({
            type: ADD_COMPANIES_B,
            payload: resData.data,
        });
        toast.success(resData.message);
    } catch (error) {
        toast.error(error.message);
    }
};

// Обновление данных компании в `CompaniesA`
export const updateCompanyB = ({ companyId, updateData }) => async (dispatch) => {
    try {
        const response = await fetch(`${API_COMPANIES_B}/${companyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        const resData = await response.json();
        dispatch({
            type: UPDATE_COMPANIES_B,
            payload: resData.data,
        });
        toast.success(resData.message);
    } catch (error) {
        toast.error(error.message);
    }
};

// Удаление компании из `CompaniesA`
export const deleteCompanyB = (companyId) => async (dispatch) => {
    try {
        await fetch(`${API_COMPANIES_B}/${companyId}`, {
            method: 'DELETE'
        });
        dispatch({
            type: DELETE_COMPANIES_B,
            payload: companyId
        });
        toast.success('Точка отправки успешно удалена!');
    } catch (error) {
        toast.error(error.message);
    }
};
