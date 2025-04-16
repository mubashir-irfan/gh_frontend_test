'use client'

import { LocalStorageService, SessionStorageService } from "@/services";
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY, REMEMBER_USER_STORAGE_KEY } from "@/utils/constants";
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
    }

    console.info('[Request] Starting', config.method?.toUpperCase(), config.url, 'with data:', config.data);
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
    // Todo: Handle errors globally and centralize error handling
    console.error('[Error] Axios instance global error handler:', error);

    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('[debug] Axios Instance ran into the case of getting a new access token using refresh token')
      originalRequest._retry = true; // Prevent infinite retry loops

      try {
        const refreshToken = LocalStorageService.get(REFRESH_TOKEN_STORAGE_KEY) ?? SessionStorageService.get(REFRESH_TOKEN_STORAGE_KEY);
        if (!refreshToken) {
          console.error('No refresh token available.');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        const refreshResponse = await axios.post('/user/login/refresh_token', {
          refreshToken: refreshToken,
        }, { baseURL: 'https://gh-frontend-dev-test-574648524742.us-central1.run.app/api/v1' });

        const newAccessToken = refreshResponse.data.access_token;

        // Update tokens in storage
        LocalStorageService.set(ACCESS_TOKEN_STORAGE_KEY, newAccessToken);

        // Retry the original request with the new access token
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        console.error('Refresh token failed:', refreshError);
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;