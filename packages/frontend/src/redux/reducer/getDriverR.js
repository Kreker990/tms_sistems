import { GET_DRIVER } from "./type"

const initialState = []

const getDriverR = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_DRIVER:
      return payload
    default:
      return state
  }
}
export default getDriverR;