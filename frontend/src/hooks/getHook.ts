// hooks/useAxiosPost.ts
import { useState } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';
import api from './tokenHeader';

interface UseAxiosPostReturn<TData, TPayload = any, TError = string> {
    data: TData | null;
    loading: boolean;
    error: TError | null;
    post: (endpoint?: string, payload?: TPayload, config?: AxiosRequestConfig) => Promise<TData>;
    reset: () => void;
}

const useAxiosPost = <TData = any, TPayload = any>(
    baseUrl: string = ''
): UseAxiosPostReturn<TData, TPayload> => {
    const [data, setData] = useState<TData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const post = async (
        endpoint: string = '',
        payload?: TPayload,
        config?: AxiosRequestConfig
    ): Promise<TData> => {
        setLoading(true);
        setError(null);

        try {
            const url = `${baseUrl}${endpoint}`;
            const response = await api.post<TData>(url, payload, config);
            setData(response.data);
            return response.data;
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message || err.message
                : 'An error occurred';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const reset = (): void => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    return { data, loading, error, post, reset };
};

export default useAxiosPost;