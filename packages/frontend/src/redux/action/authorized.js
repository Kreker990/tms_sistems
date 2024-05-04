import { CHECK_ADMIN } from "../reducer/type"

export const authorizedUpdate = (status, role) => {
  return async (dispatch) => {
    dispatch({
      type: CHECK_ADMIN,
      payload: {
        value: status,
        role: role
      }
    })
  }
}