import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "@/features/auth/context/auth-context";
import type { User } from "../types";
import { authService } from "../services/auth.service";


export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem("authToken"); // Return true if token exists, false otherwise
    });
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem("authUser");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            return null;
        }
    });

    const setAuth = useCallback((token: string, userData: User) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    }, [])

    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        const response = await authService.login(email, password)
        if (response) {
            setAuth(response.token, response.user)
            return true
        }
        return false
    }, [setAuth])

    const logout = useCallback(async () => {
        await authService.logout() // Clear token and user from localStorage
        setIsAuthenticated(false);
        setUser(null);
    }, [])

    const contextValue = useMemo(() => ({
        isAuthenticated,
        user,
        login,
        logout,
        setAuth
    }), [isAuthenticated, user, login, logout, setAuth])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}