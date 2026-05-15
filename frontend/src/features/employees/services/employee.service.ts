import { api, is_MOCK } from "@/lib/axios";
import type { Employee } from "../types";
import type { EmployeeFormValues } from "../components/employee-form";

export const MOCK_EMPLOYEES: Employee[] = [
  // --- ENGINEERING ---
  { id: crypto.randomUUID(), employeeId: "2103442", name: "Arjun Sharma", email: "arjun.s@test.com", role: "MANAGER", department: "Engineering", status: "ACTIVE", joinedDate: "2023-11-10" },
  { id: crypto.randomUUID(), employeeId: "2677881", name: "Ananya Rao", email: "ananya.r@test.com", role: "EMPLOYEE", department: "Engineering", status: "ACTIVE", joinedDate: "2024-12-05" },
  { id: crypto.randomUUID(), employeeId: "2445566", name: "Elena Rodriguez", email: "e.rodriguez@test.com", role: "EMPLOYEE", department: "Engineering", status: "ACTIVE", joinedDate: "2025-01-20" },
  { id: crypto.randomUUID(), employeeId: "2334455", name: "Omar Haddad", email: "o.haddad@test.com", role: "EMPLOYEE", department: "Engineering", status: "ACTIVE", joinedDate: "2024-02-11" },
  { id: crypto.randomUUID(), employeeId: "2887766", name: "Bruce Wayne", email: "b.wayne@test.com", role: "MANAGER", department: "Engineering", status: "ACTIVE", joinedDate: "2021-11-20" },
  { id: crypto.randomUUID(), employeeId: "2228899", name: "Peter Parker", email: "p.parker@test.com", role: "EMPLOYEE", department: "Engineering", status: "ACTIVE", joinedDate: "2025-02-28" },
  { id: crypto.randomUUID(), employeeId: "2775566", name: "Tony Stark", email: "t.stark@test.com", role: "ADMIN", department: "Engineering", status: "ACTIVE", joinedDate: "2020-05-10" },

  // --- HR ---
  { id: crypto.randomUUID(), employeeId: "2855901", name: "Priya Lakshmi", email: "priya.l@test.com", role: "EMPLOYEE", department: "HR", status: "ACTIVE", joinedDate: "2024-05-22" },
  { id: crypto.randomUUID(), employeeId: "2223344", name: "Linda Wu", email: "linda.wu@test.com", role: "EMPLOYEE", department: "HR", status: "INACTIVE", joinedDate: "2022-11-30" },
  { id: crypto.randomUUID(), employeeId: "2663322", name: "Diana Prince", email: "d.prince@test.com", role: "EMPLOYEE", department: "HR", status: "INACTIVE", joinedDate: "2023-09-05" },
  { id: crypto.randomUUID(), employeeId: "2115544", name: "Rachel Zane", email: "r.zane@test.com", role: "MANAGER", department: "HR", status: "ACTIVE", joinedDate: "2022-04-18" },

  // --- FINANCE ---
  { id: crypto.randomUUID(), employeeId: "2344118", name: "David Chen", email: "d.chen@test.com", role: "EMPLOYEE", department: "Finance", status: "INACTIVE", joinedDate: "2022-08-01" },
  { id: crypto.randomUUID(), employeeId: "2778899", name: "Kevin Park", email: "k.park@test.com", role: "MANAGER", department: "Finance", status: "ACTIVE", joinedDate: "2023-09-12" },
  { id: crypto.randomUUID(), employeeId: "2554433", name: "Monica Geller", email: "m.geller@test.com", role: "ADMIN", department: "Finance", status: "ACTIVE", joinedDate: "2024-03-10" },
  { id: crypto.randomUUID(), employeeId: "2109988", name: "Christian Wolff", email: "c.wolff@test.com", role: "EMPLOYEE", department: "Finance", status: "ON_LEAVE", joinedDate: "2023-01-15" },

  // --- MARKETING ---
  { id: crypto.randomUUID(), employeeId: "2991003", name: "Sarah Jenkins", email: "sarah.j@test.com", role: "MANAGER", department: "Marketing", status: "ACTIVE", joinedDate: "2025-02-14" },
  { id: crypto.randomUUID(), employeeId: "2667788", name: "Marcus Thorne", email: "m.thorne@test.com", role: "EMPLOYEE", department: "Marketing", status: "ACTIVE", joinedDate: "2024-07-08" },
  { id: crypto.randomUUID(), employeeId: "2441122", name: "Rachel Green", email: "r.green@test.com", role: "EMPLOYEE", department: "Marketing", status: "ACTIVE", joinedDate: "2023-06-12" },
  { id: crypto.randomUUID(), employeeId: "2331144", name: "Wanda Maximoff", email: "w.maximoff@test.com", role: "MANAGER", department: "Marketing", status: "ON_LEAVE", joinedDate: "2024-08-14" },

  // --- SALES ---
  { id: crypto.randomUUID(), employeeId: "2556770", name: "Michael Ross", email: "m.ross@test.com", role: "EMPLOYEE", department: "Sales", status: "INACTIVE", joinedDate: "2023-03-30" },
  { id: crypto.randomUUID(), employeeId: "2990011", name: "Sophie Muller", email: "s.muller@test.com", role: "MANAGER", department: "Sales", status: "ACTIVE", joinedDate: "2025-03-25" },
  { id: crypto.randomUUID(), employeeId: "2881122", name: "Jordan Belfort", email: "j.belfort@test.com", role: "EMPLOYEE", department: "Sales", status: "ACTIVE", joinedDate: "2024-10-05" },

  // --- IT SUPPORT ---
  { id: crypto.randomUUID(), employeeId: "2112334", name: "James Wilson", email: "j.wilson@test.com", role: "ADMIN", department: "IT Support", status: "ACTIVE", joinedDate: "2021-06-15" },
  { id: crypto.randomUUID(), employeeId: "2119988", name: "Steven Strange", email: "s.strange@test.com", role: "MANAGER", department: "IT Support", status: "ON_LEAVE", joinedDate: "2022-01-15" },
  { id: crypto.randomUUID(), employeeId: "2994411", name: "Natasha Romanoff", email: "n.romanoff@test.com", role: "EMPLOYEE", department: "IT Support", status: "ACTIVE", joinedDate: "2022-12-01" },
  { id: crypto.randomUUID(), employeeId: "2773322", name: "Elliot Alderson", email: "e.alderson@test.com", role: "EMPLOYEE", department: "IT Support", status: "ACTIVE", joinedDate: "2025-04-01" }
]

export const employeeService = {
    getEmployees: async (): Promise<Employee[]> => {
        if (is_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
            console.log("Returning mock employees:", MOCK_EMPLOYEES)
            return [...MOCK_EMPLOYEES]
        }

        const { data } = await api.get<Employee[]>("/employees")
        return data
    },
    getEmployeeById: async (employeeId: string): Promise<Employee> => {
        if (is_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
            const employee = MOCK_EMPLOYEES.find(emp => emp.employeeId === employeeId)
            if (!employee) {
                throw new Error("Employee not found")
            }
            return { ...employee }
        }
    },
    createEmployee: async (employee: EmployeeFormValues): Promise<Employee> => {
        if (is_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
            const newEmployee: Employee = {
                id: crypto.randomUUID(),
                employeeId: `EMP${Math.floor(100000 + Math.random() * 900000)}`,
                status: "ACTIVE",
                ...employee
            }
            MOCK_EMPLOYEES.push(newEmployee)
            return {...newEmployee}
        }

        const { data } = await api.post<Employee>("/employees", employee)
        return data
    }
}