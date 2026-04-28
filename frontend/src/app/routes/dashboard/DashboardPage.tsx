import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEmployees } from "@/features/employees/hooks/useEmployees"
import { Building2, User, UserCheck, UserMinus } from "lucide-react"
import { useMemo } from "react"


export const DashboardPage = () => {
    const { employees, loading } = useEmployees()

    const stats = useMemo(() => {
        const totalEmployees = employees.length
        const activeEmployees = employees.filter(emp => emp.status === "ACTIVE").length
        const inactiveEmployees = employees.filter(emp => emp.status === "INACTIVE").length
        const onLeaveEmployees = employees.filter(emp => emp.status === "ON_LEAVE").length
        const departments = new Set(employees.map(emp => emp.department)).size

        return [
            {
                title: "Total Employees",
                value: totalEmployees,
                icon: User,
                description: totalEmployees > 0 ? "+4 from last month" : "No data available",
                color: 'text-blue-600'
            },
            {
                title: "Active Now",
                value: activeEmployees,
                icon: UserCheck,
                description: `${inactiveEmployees} currently inactive`,
                color: 'text-emerald-600'
            },
            {
                title: "On Leave",
                value: onLeaveEmployees,
                icon: UserMinus,
                description: "Planned absences",
                color: "text-amber-600",
            },
            {
                title: "Departments",
                value: departments, // Give it its own card!
                icon: Building2, // A building icon makes more sense here
                description: "Unified organization",
                color: "text-purple-600",
            },
        ]
    }, [employees])

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, idx) => (
                        <Skeleton key={idx} className="h-32 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        )
    }

  return (
    <div className="space-y-6">
      <header className="animate-in slide-in-from-left duration-500">
        <h1 className="text-3xl font-bold tracking-tight">Workforce Overview</h1>
        <p className="text-muted-foreground">
            Real-time stats from your employee database.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
            <Card
                key={stat.title}
                className="border-none shadow-sm"
                style={{ animationDelay: `${idx * 100}ms` }}
            >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm">
            <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-50 flex items-center justify-center border-2 border-dashed rounded-lg border-muted">
                <p className="text-muted-foreground">Chart Area (Phase 2)</p>
            </CardContent>
        </Card>

        <Card className="col-span-3 border-none shadow-sm">
            <CardHeader>
                <CardTitle>Recent Hires</CardTitle>
            </CardHeader>
            <CardContent className="h-50 flex items-center justify-center border-2 border-dashed rounded-lg border-muted">
                <p className="text-muted-foreground">List Area (Phase 1.5)</p>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage