import { useCallback, useEffect, useMemo, useState } from "react"
import type { Employee } from "../types"
import { employeeService } from "../services/employee.service"

export const useEmployees = (employeeId?: string) => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [employee, setEmployee] = useState<Employee | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const loadEmployees = useCallback(async () => {
        setLoading(true)
        try {
            if (employeeId) {
                const data = await employeeService.getEmployees()
                const foundEmployee = data.find(emp => emp.employeeId === employeeId)
                if (foundEmployee) {
                    setEmployee(foundEmployee)
                } else {
                    setError("Employee not found.")
                }
            } else {
                const data = await employeeService.getEmployees()
                console.log("Reloading data from service...")
                setEmployees(data)
            }
        } catch (error) {
            console.error("Error fetching employees:", error)
            setError("Failed to load employees. Please try again later.")
        } finally {
            setLoading(false)
        }
    }, [employeeId])

    useEffect(() => {
        loadEmployees()
    }, [loadEmployees])

    return useMemo(() => ({
        employees,
        employee,
        loading,
        error,
        reload: loadEmployees
    }), [employees, employee, loading, error, loadEmployees])
}