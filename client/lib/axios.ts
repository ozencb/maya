import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { API_URL } from '../constants';
import jwtManager from '../helpers/jwt';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 250000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = jwtManager.getToken();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (accessToken) config.headers!['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    if (!originalRequest._retry) {
      originalRequest._retry = true;

      const { data } = await axiosInstance.post('auth/refresh-token');

      const newAccessToken = data.data.accessToken;
      jwtManager.setToken(newAccessToken);
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    }
  }
);

export default axiosInstance;
