export const USER_ROLES: { label: string, value: string }[] = [
    { label: "Employee", value: "EMPLOYEE" },
    { label: "Manager", value: "MANAGER" },
    { label: "Admin", value: "ADMIN" }
] as const

export type UserRole = typeof USER_ROLES[number]["value"];

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    setAuth: (token: string, user: User) => void;
    logout: () => Promise<void>;
}