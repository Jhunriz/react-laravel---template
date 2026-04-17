import { useCallback } from 'react';
import api, { setAuthToken } from '@/app/hooks/tokenHeader';
import { useNavigate } from 'react-router-dom';

type UseLogoutReturn = {
    logout: () => Promise<void>;
};

export function useLogout(): UseLogoutReturn {
    const navigate = useNavigate();

    const logout = useCallback(async () => {
        try {
            await api.post('/logout');
            setAuthToken(null);
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);

            setAuthToken(null);
            navigate('/', { replace: true });
        }
    }, [navigate]);

    return { logout };
}
