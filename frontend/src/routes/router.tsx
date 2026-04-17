import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layout/Mainlayout";
import Setting from "@/pages/settings/Settings";
import Account from "@/pages/settings/account";
import AuthLayout from "@/components/layout/AuthLayout";
import Login from "@/pages/auth/Login";
import NotFound from "@/components/layout/NotFound";
import Dashboard from "@/pages/dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/dashboard",
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
        path: "/setting",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Setting /> },
            { path: "account", element: <Account /> },
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { index: true, element: <Login /> },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);