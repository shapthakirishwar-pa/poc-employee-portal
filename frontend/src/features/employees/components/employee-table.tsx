import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Briefcase, Mail, MoreHorizontal, ShieldCheck, User } from "lucide-react"
import type { Employee, UserStatus } from "../types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { useCallback, useMemo, useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"


export default function EmployeeTable({ employees=[], loading, error }) {
    const navigate = useNavigate()

    const textStatus = useCallback((status: UserStatus) => {
        switch (status) {
            case "INACTIVE":
                return "In Active"

            case "ON_LEAVE":
                return "On Leave"
        
            default:
                return status
        }
    }, [])

    const statusStyles: Record<UserStatus, string> = {
        ACTIVE: "bg-emerald-50 text-emerald-500 border-emerald-200/60",
        INACTIVE: "bg-gray-100 text-gray-500 border-gray-200/60",
        ON_LEAVE: "bg-amber-50 text-amber-500 border-amber-200/60",
    }

    const [page, setPage] = useState(1)
    const pageSize = 5

    const totalPages = Math.max(1, Math.ceil(employees.length / pageSize))
    const safePage = Math.max(1, Math.min(page, totalPages))

    const paginatedEmployees = useMemo(() => {
        const start = (safePage-1) * pageSize
        return employees.slice(start, start + pageSize)
    }, [employees, safePage])

    if (loading) return <div className="p-8 text-center">Loading employees...</div>
    if (error) return <div className="p-8 text-center text-destructive">{error}</div>

    const headers = [ "Employee", "Employee ID", "Department", "Role", "Status", "Actions" ]

    return (
        <div className="relative h-full w-full">
            <Table className="w-full overflow-hidden">
                <TableHeader className="sticky top-0 z-10">
                    <TableRow className="hover:bg-transparent">
                        {headers.map((header) => (
                            <TableHead
                                key={header}
                                className="font-bold sticky top-0 z-20 bg-muted/95 backdrop-blur-md border-b transition-colors p-4 text-left text-muted-foreground uppercase tracking-wider"
                            >
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedEmployees?.map((emp: Employee) => (
                        <TableRow key={emp.id} className="hover:bg-muted/40 transition-all duration-200">
                            <TableCell className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20 shrink-0 shadow-sm">
                                        {emp.name.split(" ").map(part => part[0]).slice(0, 2).join("")}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-semibold text-foreground truncate">{emp.name}</span>
                                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                            <Mail className="h-3 w-3" />
                                            <span className="truncate">{emp.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                                <span className="font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded border border-border/50 text-muted-foreground">
                                    {emp.employeeId}
                                </span>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Briefcase className="h-3.5 w-3.5 opacity-60" />
                                    <span className="text-sm font-medium">{emp.department}</span>
                                </div>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    {['manager', 'admin'].includes(emp.role.toLowerCase()) ? (
                                        <ShieldCheck className="h-4 w-4 text-blue-500/80" />
                                    ) : (
                                        <User className="h-4 w-4 text-muted-foreground/70" />
                                    )}
                                    <Badge variant="secondary" className="bg-muted/50 text-muted-foreground font-medium border-none px-2 py-0">
                                        <span className="tracking-tight capitalize">{emp.role.toLowerCase()}</span>
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "gap-1.5 px-3 py-0.5 rounded-full font-medium capitalize tracking-wide transition-all",
                                        statusStyles[emp.status]
                                    )}
                                >
                                    {textStatus(emp.status).toLowerCase()}
                                </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="p-0 ring-0 border-0 text-muted-foreground"
                                        >
                                            <MoreHorizontal className="h-4 w-4 text-foreground" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => navigate(`/employees/${emp.employeeId}`)} className="cursor-pointer">View profile</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Edit employee</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                            {/* Terminate access */}
                                            Delete employee
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter className="bg-transparent">
                    <TableRow>
                        <TableCell colSpan={4}>
                            <span className="p-4 text-muted-foreground text-nowrap font-normal text-[13px]">
                                Showing <span className="text-foreground font-medium">{(page-1)*pageSize + 1}-{Math.min(page * pageSize, employees.length)}</span> of <span className="text-foreground font-medium">{employees.length}</span> employees
                            </span>
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious onClick={() => setPage(prev => Math.max(1, prev - 1))} />
                                    </PaginationItem>
                                    
                                    {/* <PaginationItem>
                                        <PaginationLink>{page}</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink>{page + 1}</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink>{page + 2}</PaginationLink>
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem> */}

                                    <PaginationItem>
                                        <PaginationNext onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}