import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { AuthLayout } from "@/components/layouts/auth-layout";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import ProtectedRoute from "@/features/auth/components/protected-route";
import { employeeService } from "@/features/employees/services/employee.service";
import type { Employee } from "@/features/employees/types";


const LoginPage = lazy(() => import("./routes/auth/LoginPage"))
const DashboardPage = lazy(() => import("./routes/dashboard/DashboardPage"))
const EmployeeManagementPage = lazy(() => import("./routes/dashboard/EmployeeManagementPage"))
const EmployeeProfilePage = lazy(() => import("./routes/dashboard/EmployeeProfilePage"))
const AddEmployeePage = lazy(() => import("./routes/dashboard/AddEmployeePage"))

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
                path: "/employees",
                handle: {
                    crumb: "Employees"
                },
                children: [
                    {
                        index: true,
                        element: <EmployeeManagementPage />
                    },
                    {
                        path: "add",
                        element: <AddEmployeePage />,
                        handle: {
                            crumb: "Add Employee"
                        }
                    },
                    {
                        path: ":employeeId",
                        element: <EmployeeProfilePage />,
                        loader: async ({ params }) => {
                            return employeeService.getEmployeeById(params.employeeId)
                        },
                        handle: {
                            crumb: (data: Employee) => data?.name || "Profile"
                        }
                    },
                    {
                        path: ":employeeId/edit",
                        element: <div>Employee form page - Coming Soon!</div>,
                        handle: {
                            crumb: "Edit Employee"
                        }
                    }
                ]
            },
            {
                path: "/leaves",
                element: <div>Leaves page - Coming Soon!</div>
            },
            {
                path: "/announcements",
                element: <div>Announcements page - Coming Soon!</div>
            },
            {
                path: "/team",
                element: <div>Team page - Coming Soon!</div>
            }
        ]
    },
    // {
    //     path: "*",
    //     element: <Navigate to="/login" replace />
    // }
])


export const AppRouter = () => {
    return <RouterProvider router={router} />
}