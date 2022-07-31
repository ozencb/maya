import { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';
import axiosInstance from '@Lib/axios';

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
