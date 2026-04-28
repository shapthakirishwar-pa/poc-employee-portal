import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import EmployeeTable from '@/features/employees/components/employee-table'
import { useState } from 'react'
import AddEmployeeSheet from '@/features/employees/components/add-employee-sheet'
import { useEmployees } from '@/features/employees/hooks/useEmployees'

function UserManagementPage() {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const { employees, loading, error, reload } = useEmployees()

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight'>Employee Directory</h1>
                    <p className='text-muted-foreground'>
                        Manage your workforce and their access levels.
                    </p>
                </div>
                <Button className='gap-2' onClick={() => setIsSheetOpen(true)}>
                    <UserPlus className='h-4 w-4' />
                    Add Employee
                </Button>
            </div>

            <EmployeeTable employees={employees} loading={loading} error={error} />
            <AddEmployeeSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} onSuccess={reload} />
        </div>
    )
}

export default UserManagementPage
