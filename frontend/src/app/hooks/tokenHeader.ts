import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token: string | null = sessionStorage.getItem('token');
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error: unknown) => {
        if (!(error instanceof Error)) {
            error = new Error(String(error));
        }
        return Promise.reject(error);
    }
);


export default api;