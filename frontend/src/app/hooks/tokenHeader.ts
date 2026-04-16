import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

let authToken: string | null = null;

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Enable sending cookies with requests
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (authToken) {
            config.headers.set('Authorization', `Bearer ${authToken}`);
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


export function setAuthToken(token: string | null) {
    authToken = token;
}

export function getAuthToken(): string | null {
    return authToken;
}

export default api;