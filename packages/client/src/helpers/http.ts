import { API_URL } from '@Constants';
import axios, {
  AxiosError,
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
    showMessageNotification: string;
  };
  headers?: AxiosRequestHeaders;
  params?: any;
}

const http = async ({ method, url, data, options, headers, params }: IHttp) => {
  let response = null;

  const request: AxiosRequestConfig = {
    method,
    url,
    headers,
    responseType: 'json',
    data,
    params,
  };

  try {
    response = await axiosInstance.request(request);
  } catch (err: any) {
    if (err.response) {
      console.log(err.response.status);
    }
  }

  if (options && options.showMessageNotification) {
    // show success
  }

  return response && response.data?.data;
};

export default http;
