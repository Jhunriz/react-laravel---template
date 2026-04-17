import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layout/AuthLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import MainLayout from "../layout/Mainlayout";
import Login from "../pages/auth/Login";
import NotFound from "../layout/NotFound";
import Setting from "../pages/setting/setting";
import Account from "../pages/setting/account";

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