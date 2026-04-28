import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { employeeService } from "../services/employee.service"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { USER_ROLES } from "@/features/auth/types"

const employeeSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    department: z.string().min(1, "Department is required"),
    role: z.enum(["EMPLOYEE", "MANAGER", "ADMIN"], "Role is required"),
    joinedDate: z.string().min(1, "Joined date is required"),
    phoneNumber: z.string().optional(),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>

interface AddEmployeeSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

function AddEmployeeSheet({ open, onOpenChange, onSuccess }: AddEmployeeSheetProps) {
    const defaultDate = new Date().toISOString().split("T")[0] // YYYY-MM-DD
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: "",
            email: "",
            department: "",
            role: "EMPLOYEE",
            joinedDate: defaultDate,
        },
    })

    const onSubmit = useCallback(async (data: EmployeeFormValues) => {
        try {
            await employeeService.createEmployee(data)
            onSuccess()
            onOpenChange(false)
            reset()
        } catch(error) {
            console.error("Failed to add employee:", error)
        }
    }, [onOpenChange, onSuccess, reset])

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md overflow-y-auto p-6">
                <SheetHeader className="text-left space-y-1 px-1">
                    <SheetTitle className="text-2xl font-bold">Add Employee</SheetTitle>
                    <SheetDescription>
                        Fill in the details to add a new employee to the system.
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="font-semibold">Full Name</Label>
                        <Input id="name" placeholder="John Doe" {...register("name")} />
                        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-semibold">Work Email</Label>
                        <Input id="email" placeholder="john.doe@example.com" {...register("email")} />
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="department" className="font-semibold">Department</Label>
                            <Input id="department" placeholder="Engineering" {...register("department")} />
                            {errors.department && <p className="text-xs text-destructive">{errors.department.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="joinedDate" className="font-semibold">Joining Date</Label>
                            <Input id="joinedDate" type="date" {...register("joinedDate")} />
                            {errors.joinedDate && <p className="text-xs text-destructive">{errors.joinedDate.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {USER_ROLES.map((role) => (
                                            <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                        <Input id="phoneNumber" placeholder="+1 234 567 8900" {...register("phoneNumber")} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Registering..." : "Add Employee"}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    )
}

export default AddEmployeeSheet
