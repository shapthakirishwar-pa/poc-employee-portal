import type { Employee } from "@/features/employees/types";
import { api, is_MOCK } from "@/lib/axios";

// --- MOCK DATA FOR TESTING ---
const MOCK_USERS: Record<string, Employee & { pass: string }> = {
    "admin@company.com": {
        id: "uuid-admin-001",
        name: "Admin",
        email: "admin@company.com",
        role: "ADMIN",
        employeeId: "EMP-1001",
        department: "ADMINISTRATION",
        status: "ACTIVE",
        joinedDate: "2023-01-15T09:00:00Z",
        pass: "admin123",
    },
}

export const authService = {
    async login(email: string, password: string): Promise<{ token: string; user: Employee } | null> {
        if (is_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
            const userRecord = MOCK_USERS[email]

            if (userRecord && userRecord.pass === password) {
                const { pass: _, ...user } = userRecord
                return {
                    token: "mock-jwt-token-1234567890",
                    user: user as Employee,
                }
            }
            return null
        }
        
        const data = await api.post<{ token: string; user: Employee }>("/auth/login", { email, password })
        return data.data
    },

    async logout(): Promise<void> {
        try {
            if (!is_MOCK) {
                await api.post("/auth/logout");
            }
        } catch (error) {
            console.error("Logout request failed", error);
        } finally {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authUser");
            
            window.location.href = "/login";
        }
    }
}