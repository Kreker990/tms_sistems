// import { getToken, handleError } from '@api/common';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
// import { TIMEOUT } from '@shared/constants';

const { BACKEND_URL } = process.env;
console.log(BACKEND_URL);

export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const GET = 'GET';

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, auth = null }) => {
    const headers = {};
    // const token = getToken();
    // headers['Content-Type'] = 'application/json';
    // headers['Authorization'] = `Bearer ${token}`;
      const client = axios.create(
        {
           baseURL: "http://localhost:3011",
        headers: headers,
        // timeout: TIMEOUT,
      },
      auth,
    );
    try {
      const result = await client({
        url: url,
        method,
        data,
        params,
        headers: headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      return console.error(axiosError);
    }
  };
export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: [],
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === REHYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  endpoints: () => ({}),
});
export const authApi = createApi({
  reducerPath: 'authApi',
  refetchOnMountOrArgChange: true,
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === REHYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  endpoints: () => ({}),
});
