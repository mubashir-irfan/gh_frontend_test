import { AxiosHeaderValue, AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";
import { QueryParams } from "@/types";

export const ServerAPI = {
  get: async <T>(
    url: string,
    params?: QueryParams,
    customHeaders?: Record<string, AxiosHeaderValue>,
  ): Promise<T> => {
    const res = await axiosInstance.get<T>(url, { headers: { ...customHeaders }, params });
    return res.data;
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