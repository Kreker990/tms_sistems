/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { getToken, TokenTypes } from './tokenRepository';
import eventEmitter from './EventEmitter';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken(TokenTypes.ACCESS);
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      eventEmitter.emit('401');
    }

    return Promise.reject(error);
  }
);

export { apiClient };