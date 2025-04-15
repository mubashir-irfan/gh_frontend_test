import axios, { AxiosError, AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 180000,
});


axiosInstance.interceptors.response.use(
  (response) => response?.data,
  (error: AxiosError) => {
    // Todo: Handle errors globally and centralize error handling
    console.error('[Error] Axios instance global error handler:', error);

    return Promise.reject(error);
  },
);

export default axiosInstance;