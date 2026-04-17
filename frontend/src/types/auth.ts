export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    data: {
        token: string;
        user: {
            id: string;
            email: string;
            name?: string;
            role?: string;
        };
    };
    message?: string;
}

export interface UseLoginReturn {
    login: (credentials: LoginCredentials) => Promise<LoginResponse | null>;
    loading: boolean;
    error: string | null;
    data: LoginResponse | null;
    reset: () => void;
}
