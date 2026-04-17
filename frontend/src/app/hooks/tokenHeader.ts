import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';

let authToken: string | null = null;

// Initialize token from cookies on module load
const initializeAuthToken = () => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
        authToken = storedToken;
    }
};
initializeAuthToken();

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

// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token is invalid or expired, clear it and redirect
            setAuthToken(null);
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export function setAuthToken(token: string | null) {
    authToken = token;
    if (token) {
        Cookies.set('authToken', token, { expires: 1 }); // 1 day
    } else {
        Cookies.remove('authToken');
    }
}

export function getAuthToken(): string | null {
    return authToken;
}

export default api;