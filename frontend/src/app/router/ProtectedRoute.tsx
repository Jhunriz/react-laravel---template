import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/app/hooks/tokenHeader";

type Props = {
    children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // Check if user is authenticated by calling the protected endpoint
        api.get('/index')
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}