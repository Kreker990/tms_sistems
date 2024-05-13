// actions/companiesA.js
import { GET_COMPANIES_A, ADD_COMPANIES_A, UPDATE_COMPANIES_A, DELETE_COMPANIES_A } from "../reducer/type";
import { API_COMPANIES_A } from "../config";
import toast from "react-hot-toast";

// Получение всех компаний из `CompaniesA`
export const getCompaniesA = () => async (dispatch) => {
    try {
        const response = await fetch(API_COMPANIES_A);
        const resData = await response.json();

        dispatch({
            type: GET_COMPANIES_A,
            payload: resData
        });
    } catch (error) {
        toast.error(error.message);
    }
};

// Добавление новой компании в `CompaniesA`
export const addCompanyA = (companyData) => async (dispatch) => {
    try {
        const response = await fetch(API_COMPANIES_A, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData)
        });
        const resData = await response.json();
        dispatch({
            type: ADD_COMPANIES_A,
            payload: resData.data,
        });
        toast.success(resData.message);
    } catch (error) {
        toast.error(error.message);
    }
};

// Обновление данных компании в `CompaniesA`
export const updateCompanyA = ({ companyId, updateData }) => async (dispatch) => {
    try {
        const response = await fetch(`${API_COMPANIES_A}/${companyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        const resData = await response.json();
        dispatch({
            type: UPDATE_COMPANIES_A,
            payload: resData.data,
        });
        toast.success(resData.message);
    } catch (error) {
        toast.error(error.message);
    }
};

// Удаление компании из `CompaniesA`
export const deleteCompanyA = (companyId) => async (dispatch) => {
    try {
        await fetch(`${API_COMPANIES_A}/${companyId}`, {
            method: 'DELETE'
        });
        dispatch({
            type: DELETE_COMPANIES_A,
            payload: companyId
        });
        toast.success('Точка отправки успешно удалена!');
    } catch (error) {
        toast.error(error.message);
    }
};
