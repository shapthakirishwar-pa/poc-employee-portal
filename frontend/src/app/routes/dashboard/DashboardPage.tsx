import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEmployees } from "@/features/employees/hooks/useEmployees"
import { Megaphone, CalendarDays, Download, EllipsisVerticalIcon, UserCheck, Users, ChevronRight, UserPlus, NotebookPen, ListTodo, CalendarX } from "lucide-react"
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
                icon: Users,
                description: totalEmployees > 0 ? "+4 from last month" : "No data available",
                textColor: 'text-blue-600',
                bgColor: 'bg-blue-50'
            },
            {
                title: "Attendance Rate",
                value: `${((activeEmployees*100)/(totalEmployees)).toFixed(2)}%`,
                icon: UserCheck,
                description: `${inactiveEmployees} currently inactive`,
                textColor: 'text-emerald-600',
                bgColor: 'bg-emerald-50'
            },
            {
                title: "Pending Approvals",
                value: onLeaveEmployees,
                icon: CalendarX,
                description: "Planned absences",
                textColor: "text-amber-600",
                bgColor: 'bg-amber-50'
            },
            {
                title: "Active Announcements",
                value: departments, // Give it its own card!
                icon: Megaphone, // A building icon makes more sense here
                description: "Unified organization",
                textColor: "text-purple-600",
                bgColor: 'bg-purple-50'
            },
        ]
    }, [employees])

    const recentActivity = useMemo(() => {
        return [
            {
            "id": 1,
            "type": "approval",
            "avatar": {
                "image_url": "sarah_jenkins_avatar.png",
                "status_icon": "check_circle_green"
            },
            "content": {
                "subject": "Sarah Jenkins",
                "action": "approved a leave request for",
                "object": "David Chen"
            },
            "metadata": {
                "timestamp": "Today at 10:45 AM",
                "category": "Leave Management"
            },
            "actions_menu": "vertical_ellipsis"
            },
            {
            "id": 2,
            "type": "onboarding",
            "icon": "person_add_blue",
            "content": {
                "title": "New Employee Onboarding",
                "message": "Welcome Marcus Thorne to the Product Team"
            },
            "metadata": {
                "timestamp": "Yesterday at 4:12 PM",
                "category": "HR Operations"
            },
            "actions_menu": "vertical_ellipsis"
            },
            {
            "id": 3,
            "type": "announcement",
            "icon": "megaphone_gray",
            "content": {
                "title": "Policy Update",
                "message": "New remote work guidelines have been posted."
            },
            "metadata": {
                "timestamp": "2 days ago",
                "category": "Announcements"
            },
            "actions_menu": "vertical_ellipsis"
            }
        ]
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col gap-[2cqh]">
                <div className="space-y-[1cqh]">
                    <Skeleton className="h-[3cqh] w-[20cqw] bg-accent-foreground/10" />
                    <Skeleton className="h-[2cqh] w-[30cqw] bg-accent-foreground/10" />
                </div>
                <div className="grid gap-[2cqh] grid-cols-[repeat(auto-fit,minmax(24cqw,1fr))]">
                    {[...Array(4)].map((_, idx) => (
                        <Skeleton key={idx} className="h-[14cqh] rounded-[1.5cqh] bg-accent-foreground/10" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-0 gap-[5cqh]">
            <header className="flex shrink-0">
                <div className="flex flex-col">
                    <h1 className="text-[4.2cqh] font-bold tracking-tight animate-in slide-in-from-left duration-500">Dashboard</h1>
                    <p className="text-[2.6cqh] text-muted-foreground">
                        Overview of your organization's health and activity.
                    </p>
                </div>
                <div className="hidden sm:flex flex-1 w-full items-end-safe justify-end-safe">
                    <Button variant="outline" className="text-[2.6cqh] p-[3cqh] w-max rounded-[1cqh] gap-[1.4cqh] flex items-center justify-center animate-in slide-in-from-left duration-500 delay-100">
                        <Download className="size-[2.4cqh]" />
                        <span>Export Report</span>
                    </Button>
                </div>
            </header>
        
            <div className="grid gap-[4cqh] md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, idx) => (
                    <Card
                        key={stat.title}
                        className="flex flex-col justify-between rounded-[2cqh]"
                        style={{ animationDelay: `${idx * 80}ms` }}
                    >
                        <CardContent className="flex flex-col justify-center gap-[0.5cqh]">
                            <div className={`${stat.bgColor} size-[7cqh] p-[1.5cqh] pb-[2.5cqh] flex justify-center items-center rounded-[1.5cqh]`}>
                                <stat.icon className={`size-full ${stat.textColor}`} />
                            </div>
                        </CardContent>
                        <CardHeader className="uppercase tracking-wider items-center justify-between pb-[1cqh]">
                            <CardTitle className="text-[2cqh] font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <CardDescription>
                                <div className="text-[4cqh] font-bold text-card-foreground">{stat.value}</div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <div className="grid gap-[4cqh] md:grid-cols-1 lg:grid-cols-3">
                <Card className="rounded-[2cqh] lg:col-span-2 overflow-y-auto no-scrollbar">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="text-[3cqh]">Recent Activity</CardTitle>
                        <Button variant="link" className="text-blue-500 underline-offset-1 font-normal">View All</Button>
                    </CardHeader>
                    <CardContent className="flex-1 rounded-[1.5cqh] p-0">
                        {recentActivity.length > 0
                            ? (recentActivity.map(activity => (
                                <Card className="flex flex-row items-center px-[3cqh] py-[5cqh] rounded-none border-none shadow-none" key={activity.id}>
                                    <div className="bg-accent flex items-center justify-center rounded-full size-[3cqh] p-[3cqh]">U</div>
                                    <div className="size-full flex justify-between">
                                        <div>
                                            <CardTitle>Sarah Jenkins approved a leave request for David Chen</CardTitle>
                                            <CardDescription>Today at 10:45 AM • Leave Management</CardDescription>
                                        </div>
                                        <Button variant="ghost"  className="p-0">
                                            <EllipsisVerticalIcon className="size-[4cqh]" />
                                        </Button>
                                    </div>
                                </Card>
                            )))
                            : <p className="text-[2cqh] text-muted-foreground size-full flex items-center justify-center">No recent activity</p>
                        }
                    </CardContent>
                </Card>
                <div className="gap-[4cqh] flex flex-col">
                    <Card className="rounded-[2cqh]">
                        <CardHeader>
                            <CardTitle className="text-[3cqh]">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-[2cqh] rounded-[1.5cqh]">
                            {/* <p className="text-[2cqh] text-muted-foreground">No Actions Available</p> */}
                            <Button className="flex justify-between items-center rounded-[1cqh] w-full px-[2cqh] py-[4.5cqh]">
                                <div className="flex items-center gap-[2cqh]">
                                    <UserPlus className="size-[3.2cqh] font-bold" />
                                    <span>Add Employee</span>
                                </div>
                                <ChevronRight />
                            </Button>
                            <Button variant="outline" className="flex justify-between items-center rounded-[1cqh] w-full px-[2cqh] py-[4.5cqh]">
                                <div className="flex items-center gap-[2cqh]">
                                    <NotebookPen className="size-[3.2cqh] font-bold" />
                                    <span>Post Announcement</span>
                                </div>
                                <ChevronRight />
                            </Button>
                            <Button variant="outline" className="flex justify-between items-center rounded-[1cqh] w-full px-[2cqh] py-[4.5cqh]">
                                <div className="flex items-center gap-[2cqh]">
                                    <ListTodo className="size-[3.2cqh] font-bold" />
                                    <span>Review Leaves</span>
                                </div>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="flex-1 flex flex-col rounded-[2cqh]">
                        <CardHeader className="flex justify-between">
                            <CardTitle className="text-[3cqh]">Team Calendar</CardTitle>
                            <CalendarDays className="size-[3cqh] text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="flex-1 flex rounded-[1.5cqh]">
                            <p className="size-full flex items-center justify-center text-[2cqh] text-muted-foreground">No Events Scheduled</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage