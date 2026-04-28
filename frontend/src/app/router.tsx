import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { AuthLayout } from "@/components/layouts/auth-layout";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import ProtectedRoute from "@/features/auth/components/protected-route";


const LoginPage = lazy(() => import("./routes/auth/LoginPage"))
const DashboardPage = lazy(() => import("./routes/dashboard/DashboardPage"))
const UserManagementPage = lazy(() => import("./routes/dashboard/UserManagementPage"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dashboard" replace />
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    },
    {
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage />
            },
            {
                path: "/admin/users",
                element: <UserManagementPage />
            },
            {
                path: "/settings",
                element: (
                    <div className="p-6">
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p className="text-muted-foreground">Coming soon in Phase 1...</p>
                    </div>
                )
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />
    }
])


export const AppRouter = () => {
    return <RouterProvider router={router} />
}