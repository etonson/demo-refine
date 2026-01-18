import dataProviderSimpleRest, { axiosInstance } from "@refinedev/simple-rest";
import { API_URL, TOKEN_KEY } from "./constants";
// 設置 axios 攔截器來添加 JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export const dataProvider = dataProviderSimpleRest(API_URL, axiosInstance);
