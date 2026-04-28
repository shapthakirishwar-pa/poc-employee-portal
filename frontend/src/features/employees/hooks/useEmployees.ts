import { useCallback, useEffect, useState } from "react"
import type { Employee } from "../types"
import { employeeService } from "../services/employee.service"

export const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const loadEmployees = useCallback(async () => {
        setLoading(true)
        try {
            const data = await employeeService.getEmployees()
            console.log("Reloading data from service...")
            setEmployees(data)
        } catch (error) {
            console.error("Error fetching employees:", error)
            setError("Failed to load employees. Please try again later.")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadEmployees()
    }, [loadEmployees])

    return {
        employees,
        loading,
        error,
        reload: loadEmployees
    }
}