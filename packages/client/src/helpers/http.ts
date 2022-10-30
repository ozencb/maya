import toast from 'react-hot-toast/headless';

import { API_URL } from '@Constants';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  Method,
} from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 250000,
  withCredentials: true,
});

interface IHttp {
  method: Method;
  url: string;
  data?: any;
  options?: {
    showMessageNotification: boolean;
  };
  headers?: AxiosRequestHeaders;
  params?: any;
}

const http = async ({ method, url, data, options, headers, params }: IHttp) => {
  const request: AxiosRequestConfig = {
    method,
    url,
    headers,
    responseType: 'json',
    data,
    params,
  };

  try {
    const response = await axiosInstance.request(request);

    if (
      options &&
      options.showMessageNotification &&
      response &&
      response.data.message
    ) {
      toast.success(response.data.message);
    }
    return response && response.data?.data;
  } catch (err: any) {
    if (err.response.data.message) {
      toast.error(err.response.data.message);
    }
  }
};

export default http;
