import axios, { AxiosInstance } from 'axios';

import { API_URL } from '@Constants';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 250000,
  withCredentials: true,
});

export default axiosInstance;
