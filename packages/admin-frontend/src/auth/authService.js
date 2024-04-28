import { apiClient } from './httpService';

const signInUser = async ({ email, password }) => {
  console.log({ email, password });
  try {
    const response = await apiClient.post('/api/v1/auth/signin', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw error;
  }
};

const checkAuth = async () => {
  try {
    const response = await apiClient.get('/api/v1/trainer/package/healthcheck');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { signInUser, checkAuth };
