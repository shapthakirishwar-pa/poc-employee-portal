import { Button } from '@/components/ui/button'
import { FilterX, ListFilter, Search, UserPlus } from 'lucide-react'
import EmployeeTable from '@/features/employees/components/employee-table'
import { useState } from 'react'
import { useEmployees } from '@/features/employees/hooks/useEmployees'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'

function EmployeeManagementPage() {
    const navigate = useNavigate()
    const { employees, loading, error } = useEmployees()
    const [searchTerm, setSearchTerm] = useState("")
    const [deptFilter, setDeptFilter] = useState("all")
    const [roleFilter, setRoleFilter] = useState("all")

    const resetFilters = () => {
        setSearchTerm("")
        setDeptFilter("all")
    }

    return (
        <div className='flex flex-col min-h-0 gap-[5cqh]'>
            <header className="flex shrink-0">
                <div className="flex flex-col">
                    <h1 className="text-[4.2cqh] font-bold tracking-tight animate-in slide-in-from-left duration-500">Employee Management</h1>
                    <p className="text-[2.6cqh] text-muted-foreground">
                        Manage, filter, and track employee details across all departments.
                    </p>
                </div>
                <div className="hidden sm:flex flex-1 w-full items-end-safe justify-end-safe">
                    <Button
                        onClick={() => navigate('/employees/add')}
                        className="
                            text-[2.6cqh] p-[3cqh] w-max rounded-[1cqh] gap-[1.4cqh]
                            flex items-center justify-center
                            animate-in slide-in-from-left duration-500 delay-100
                        ">
                        <UserPlus className="size-[2.4cqh]" />
                        <span>Add Employee</span>
                    </Button>
                </div>
            </header>
            {/* <div className='flex items-center justify-between shrink-0'>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight animate-in slide-in-from-left duration-500'>Employee Directory</h1>
                    <p className='text-muted-foreground'>
                        Manage your workforce and their access levels.
                    </p>
                </div>
                <Button className='gap-2' onClick={() => setIsSheetOpen(true)}>
                    <UserPlus className='h-4 w-4' />
                    Add Employee
                </Button>
            </div> */}

            {/* Search */}
            <div className='flex items-center gap-4 shrink-0 bg-card p-4 rounded-lg border shadow-xs'>
                <div className='relative flex-1'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                        placeholder='Search by name, ID, or email...'
                        className='pl-9 bg-transparent rounded-[1cqh]'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Select value={deptFilter} onValueChange={setDeptFilter}>
                    <SelectTrigger className='px-[1.6cqh] pl-[2cqh] py-[3cqh] w-full max-w-[14.5cqw] rounded-[1.4cqh]'>
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Departments</SelectLabel>
                            <SelectItem value="all">All Departments</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className='px-[1.6cqh] pl-[2cqh] py-[3cqh] w-full max-w-[15cqw] rounded-[1.4cqh]'>
                        <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Roles</SelectLabel>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button variant='outline' className='h-[6cqh] font-normal rounded-[1cqh] gap-2'>
                    <ListFilter />
                    <span>More Filters</span>
                </Button>

                {(searchTerm || deptFilter !== "all") && (
                    <Button variant="ghost" onClick={resetFilters} className='gap-2 text-destructive hover:text-destructive bg-destructive/10 hover:bg-destructive/15'>
                        <FilterX className='h-4 w-4' />
                        Clear
                    </Button>
                )}
            </div>
            
            {/* Table */}
            <div className='flex-1 min-h-0 bg-card rounded-lg border shadow-sm'>
                <EmployeeTable employees={employees} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default EmployeeManagementPage
