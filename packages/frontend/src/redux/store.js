import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducer';
import { authApi, commonApi } from './api';
import { rootReducer } from "./reducer";

export const store = configureStore({
  reducer: {
    // Добавление редьюсеров от RTK Query API
    [commonApi.reducerPath]: commonApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    // Ваши другие редьюсеры
    ...rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commonApi.middleware, authApi.middleware),
});
