
import { useState } from 'react';
import api, { setAuthToken } from '@/hooks/tokenHeader';
import { AxiosError } from 'axios';
import type { LoginCredentials, LoginResponse, UseLoginReturn } from '@/types/auth';
import { BASEURL } from '@/config/api';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';



export function useLogin(): UseLoginReturn {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<LoginResponse | null>(null);
    const dispatch = useAppDispatch();

    const login = async (credentials: LoginCredentials): Promise<LoginResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post<LoginResponse>(`${BASEURL}/login`, credentials);
            if (response.data.data?.token) {
                setAuthToken(response.data.data.token);
            }
            setData(response.data);
            if (response.data.data?.user) {
                dispatch(setUser(response.data.data.user));
            }
            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            const errorMessage = axiosError.response?.data?.message ||
                axiosError.message ||
                'Login failed. Please try again.';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setLoading(false);
        setError(null);
        setData(null);
    };

    return { login, loading, error, data, reset };
}