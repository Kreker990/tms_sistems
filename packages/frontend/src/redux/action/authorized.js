import { CHECK_ADMIN } from "../reducer/type"

export const authorizedUpdate = (status) => {
  return async (dispatch) => {
    console.log(1)
    dispatch({
      type: CHECK_ADMIN,
      payload: { value: status }
    })
  }
}