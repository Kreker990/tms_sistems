import { CHECK_ADMIN } from "./type";

const initialState = {
  value: false,
  role: '',
}

const getCheckAdmin = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case CHECK_ADMIN:
      return payload
    default:
      return state
  }
}
export default getCheckAdmin;