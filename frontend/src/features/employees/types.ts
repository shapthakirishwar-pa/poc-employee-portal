import type { User } from "../auth/types";

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';

export interface Employee extends User {
    employeeId: string;
    department: string;
    status: UserStatus;
    joinedDate: string; // ISO date string
    phoneNumber?: string;
}

export interface GetEmployeesResponse {
    data: Employee[];
}