import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export const ServerAPI = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.get<T>(url, config);
  },

  post: async <T, U>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    
    const res = await axiosInstance.post<T>(url, data, config);
    return res.data;
  },

  put: async <T, U>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const res = await axiosInstance.put<T>(url, data, config);
    return res.data;
  },

  patch: async <T, U>(
    url: string,
    data?: U,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const res = await axiosInstance.patch<T>(url, data, config);
    return res.data;
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const res = await axiosInstance.delete<T>(url, config);
    return res.data
  },
};

export default ServerAPI;