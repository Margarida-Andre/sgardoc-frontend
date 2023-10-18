import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "https://sgardoc-backend-api.vercel.app",
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("sgardoc-instic");
    if (token) {
      (config.headers ??= {}).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

export default api;
