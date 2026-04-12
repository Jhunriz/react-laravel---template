import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layout/AuthLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import MainLayout from "../layout/Mainlayout";
import Login from "../pages/auth/Login";
import NotFound from "../layout/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Dashboard /> },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);