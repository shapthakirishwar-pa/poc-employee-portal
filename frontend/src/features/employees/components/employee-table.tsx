import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "lucide-react"


export default function EmployeeTable({ employees=[], loading, error }) {
    if (loading) return <div className="p-8 text-center">Loading employees...</div>
    if (error) return <div className="p-8 text-center text-destructive">{error}</div>

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="font-bold">Employee</TableHead>
                        <TableHead className="font-bold">ID</TableHead>
                        <TableHead className="font-bold">Department</TableHead>
                        <TableHead className="font-bold">Role</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees?.map((emp) => (
                        <TableRow key={emp.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{emp.name}</span>
                                    <span className="text-xs text-muted-foreground">{emp.email}</span>
                                </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{emp.employeeId}</TableCell>
                            <TableCell>{emp.department}</TableCell>
                            <TableCell>
                                <span className="capitalize text-sm">{emp.role}</span>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    // variant={emp.status === "ACTIVE" ? "success" : "secondary"}
                                    className={
                                        emp.status === "ACTIVE" ?
                                        "bg-emerald-500/ text-emerald-600 hover:bg-emerald-500/20" : ""
                                    }
                                >
                                    {emp.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
