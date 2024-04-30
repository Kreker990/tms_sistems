import { API_DRIVERS, API_GET_TRAVEL } from "../config"
import { GET_DRIVER } from "../reducer/type"

export const getDriver = () => {
    return async (dispatch) => {
        const response = await fetch(API_DRIVERS)
        const resData = await response.json()
        console.log(resData)
        dispatch({
            type: GET_DRIVER,
            payload: resData
        })
    }
}