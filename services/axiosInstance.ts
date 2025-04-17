'use client'

import { LocalStorageService, SessionStorageService } from "@/services";
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY, REMEMBER_USER_STORAGE_KEY } from "@/libs/constants";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://gh-frontend-dev-test-574648524742.us-central1.run.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'api_key': process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY,
  },
  timeout: 180000,
});


// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach Auth Bearer header
    const accessToken = SessionStorageService.get(ACCESS_TOKEN_STORAGE_KEY) ?? LocalStorageService.get(ACCESS_TOKEN_STORAGE_KEY);
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers.token = accessToken;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = SessionStorageService.get(REFRESH_TOKEN_STORAGE_KEY)
          ?? LocalStorageService.get(REFRESH_TOKEN_STORAGE_KEY);

        if (!refreshToken) {
          console.error('No refresh token available.');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        const refreshResponse = await axios.get('https://gh-frontend-dev-test-574648524742.us-central1.run.app/api/v1/user/login/refresh_token', {
          headers: {
            token: refreshToken,
            'api_key': process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY
          }
        });

        const newAccessToken = refreshResponse.data.access_token;

        if (LocalStorageService.get(REMEMBER_USER_STORAGE_KEY)) LocalStorageService.set(ACCESS_TOKEN_STORAGE_KEY, newAccessToken);
        else SessionStorageService.set(ACCESS_TOKEN_STORAGE_KEY, newAccessToken);

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        axiosInstance.defaults.headers.common['token'] = newAccessToken;
        axiosInstance.defaults.headers.common['api_key'] = process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }

    }

    return Promise.reject(error);
  }
);

export default axiosInstance;