import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { employeeService } from "../services/employee.service"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { USER_ROLES } from "@/features/auth/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Camera } from "lucide-react"
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxValue } from "@/components/ui/combobox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEmployees } from "../hooks/useEmployees"
import type { Employee } from "../types"
import nationalities from "npm-nationality-list"


const DEPARTMENTS = [
    "Engineering",
    "HR",
    "Design",
    "Marketing"
]

const ROLES = [
    "Employee",
    "Manager",
    "Admin"
]

const employeeSchema = z.object({
    photo: z
        .any()
        .refine((file) => !file || file?.length === 1, "Upload a single image")
        .optional(),

    fullname: z.string().min(1, "Full name is required"),
    dob: z.string()
        .optional()
        .refine(date => !date || new Date(date) < new Date(), "Date of birth must be in the past"),
    gender: z.enum(["male", "female", "other"], {
        error: "Please select a valid gender"
    }).optional(),
    maritalStatus: z.string().optional(),
    nationality: z.string().optional(),
    languages: z.array(z.string().optional()),
    
    department: z.string().min(1, "Please select a department"),
    role: z.string().min(1, "Please select a role"),
    employeeType: z.enum(["full-time", "contract", "probation"], {
        error: "Select an employment type"
    }),
    manager: z.string()
        .optional(),
        // .refine(employee => employee.manager !== employee.id, {
        //     error: "Employee cannot be their own manager",
        //     path: ["manager"]
        // }),
    doj: z.string().min(1, "Date of joining is required"),
    location: z.string().min(1, "Work location is required"),
    
    email: z.email("Invalid email address").min(1, "Email is required"),
    phone: z.string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[0-9+()\-\s]+$/, "Invalid phone number format"),
    emergencyContactName: z.string().min(1, "Emergency contact name is required"),
    emergencyContactPhone: z.string()
        .min(10, "Emergency contact number must be at least 10 digits")
        .regex(/^[0-9+()\-\s]+$/, "Invalid phone number format"),

    employeeStatus: z.enum(["active", "on-leave", "in-active"]).optional(),
    notes: z.string().optional(),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>

interface EmployeeFormProps {
    onSuccess: () => void
}

function EmployeeForm() {
    const { employees } = useEmployees()

    const form = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            photo: undefined,
            fullname: "",
            dob: "",
            gender: undefined,
            maritalStatus: "",
            nationality: "",
            languages: [],
            department: "",
            role: "",
            employeeType: undefined,
            manager: "",
            doj: "",
            location: "",
            email: "",
            phone: "",
            emergencyContactName: "",
            emergencyContactPhone: "",
            employeeStatus: "active",
            notes: ""
        }
    })

    const handleSubmit = useCallback(async (data: EmployeeFormValues) => {
        try {
            // await employeeService.createEmployee(data)
            const payload = {
                ...data,
                employeeStatus: "active"
            }
            console.log(payload)
        } catch(error) {
            console.error("Failed to add employee:", error)
        }
    }, [])

    return (
        <Card className="rounded-lg p-0">
            <CardContent className="p-0">
                <form id="add-employee-form" onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid grid-cols-1 sm:flex gap-6 w-full border-b p-5">
                        <div className="w-full sm:w-65 space-y-6">
                            <div>
                                <h2 className="font-semibold text-[16px]">Personal Details</h2>
                                <p className="text-muted-foreground wrap-normal">Basic identity and contact information for the new hire.</p>
                            </div>
                            <Controller
                                name="photo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel className="w-full relative group rounded-lg border-2 border-dashed flex flex-col p-8 bg-accent hover:border-blue-500 duration-200 cursor-pointer">
                                            <Input
                                                {...field}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                            <Camera className="font-bold size-7 text-muted-foreground group-hover:text-blue-500" />
                                            <span>Upload Photo</span>
                                        </FieldLabel>
                                    </Field>
                                )}
                            />
                        </div>
                        <FieldGroup className="flex-1 space-y-4">
                            <Controller
                                name="fullname"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Full Name</FieldLabel>
                                        <Input
                                            {...field}
                                            autoComplete="name"
                                            placeholder="e.g. Sarah Jenkins"
                                            className="bg-transparent rounded-md h-10 hover:bg-accent"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <div className="grid grid-cols-1 sm:flex gap-5">
                                <Controller
                                    name="dob"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Date of Birth</FieldLabel>
                                            <Input
                                                {...field}
                                                type="date"
                                                placeholder="Select date of birth"
                                                className="bg-transparent rounded-md h-10 hover:bg-accent"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="gender"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <FieldGroup data-invalid={fieldState.invalid}>
                                            <FieldLabel>Gender</FieldLabel>
                                            <RadioGroup
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="flex"
                                            >
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" value="male" />
                                                    <FieldContent>
                                                        <FieldTitle className="font-normal">Male</FieldTitle>
                                                    </FieldContent>
                                                </Field>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" value="female" />
                                                    <FieldContent>
                                                        <FieldTitle className="font-normal">Female</FieldTitle>
                                                    </FieldContent>
                                                </Field>
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" value="other" />
                                                    <FieldContent>
                                                        <FieldTitle className="font-normal">Other</FieldTitle>
                                                    </FieldContent>
                                                </Field>
                                            </RadioGroup>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </FieldGroup>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:flex gap-5">
                                <Controller
                                    name="maritalStatus"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Marital Status</FieldLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="h-10 py-5 px-3">
                                                    <SelectValue placeholder="Select marital status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Marital Status</SelectLabel>
                                                        <SelectItem value="single">Single</SelectItem>
                                                        <SelectItem value="marries">Married</SelectItem>
                                                        <SelectItem value="divorced">Divorced</SelectItem>
                                                        <SelectItem value="widowed">Prefer not to say</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="nationality"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Nationality</FieldLabel>
                                            <Combobox
                                                items={nationalities.getList()}
                                                itemToStringValue={(nationality) => nationality.alpha_3_code}
                                                itemToStringLabel={(nationality) => nationality.nationality}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <ComboboxInput className="h-10" placeholder="Search nationality" />
                                                <ComboboxContent>
                                                    <ComboboxEmpty>No data found.</ComboboxEmpty>
                                                    <ComboboxList>
                                                        <ComboboxGroup>
                                                            {/* <ComboboxLabel>Nationalities</ComboboxLabel> */}
                                                            <ComboboxCollection>
                                                                {(nationality) => (
                                                                    <ComboboxItem key={nationality?.alpha_3_code} value={nationality}>
                                                                        {nationality?.en_short_name}
                                                                    </ComboboxItem>
                                                                )}
                                                            </ComboboxCollection>
                                                        </ComboboxGroup>
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Controller
                                    name="languages"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field className="col-span-1" data-invalid={fieldState.invalid}>
                                            <FieldLabel>Language Proficiency</FieldLabel>
                                            <Combobox
                                                multiple
                                                items={["English", "Tamil", "Kannada", "Telugu", "Hindi"]}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <ComboboxChips>
                                                    <ComboboxValue>
                                                        {field.value.map((item) => (
                                                            <ComboboxChip key={item}>{item}</ComboboxChip>
                                                        ))}
                                                    </ComboboxValue>
                                                    <ComboboxChipsInput className="h-8" placeholder="Add languages" />
                                                </ComboboxChips>
                                                <ComboboxContent className="absolute -left-3">
                                                    <ComboboxEmpty>No language found.</ComboboxEmpty>
                                                    <ComboboxList>
                                                        <ComboboxGroup>
                                                            <ComboboxCollection>
                                                                {(language) => (
                                                                    <ComboboxItem key={language} value={language}>{language}</ComboboxItem>
                                                                )}
                                                            </ComboboxCollection>
                                                        </ComboboxGroup>
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FieldGroup>
                    </div>
                    <div className="grid grid-cols-1 sm:flex gap-6 w-full border-b p-5">
                        <div className="w-full sm:w-65 space-y-6">
                            <div>
                                <h2 className="font-semibold text-[16px]">Employee Information</h2>
                                <p className="text-muted-foreground wrap-normal">Specify the department, position, and current status of the employee.</p>
                            </div>
                        </div>
                        <FieldGroup className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 sm:flex gap-5">
                                <Controller
                                    name="department"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Department</FieldLabel>
                                            <Combobox
                                                items={DEPARTMENTS}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <ComboboxInput className="h-10" placeholder="Select department" />
                                                <ComboboxContent>
                                                    <ComboboxEmpty>No departments found.</ComboboxEmpty>
                                                    <ComboboxList>
                                                        <ComboboxGroup>
                                                            {/* <ComboboxLabel>Departments</ComboboxLabel> */}
                                                            <ComboboxCollection>
                                                                {(department) => (
                                                                    <ComboboxItem key={department} value={department}>{department}</ComboboxItem>
                                                                )}
                                                            </ComboboxCollection>
                                                        </ComboboxGroup>
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="role"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Role</FieldLabel>
                                            <Combobox
                                                items={USER_ROLES}
                                                defaultValue=""
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <ComboboxInput className="h-10" placeholder="Select role" />
                                                <ComboboxContent>
                                                    <ComboboxEmpty>No roles found.</ComboboxEmpty>
                                                    <ComboboxList>
                                                        <ComboboxGroup>
                                                            {/* <ComboboxLabel>Roles</ComboboxLabel> */}
                                                            <ComboboxCollection>
                                                                {(role) => (
                                                                    <ComboboxItem key={role.value} value={role.value}>{role.label}</ComboboxItem>
                                                                )}
                                                            </ComboboxCollection>
                                                        </ComboboxGroup>
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                            {form.formState.errors.role && <FieldError>{form.formState.errors.role.message}</FieldError>}
                                        </Field>
                                    )}
                                />
                            </div>
                            <Controller
                                name="employeeType"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <FieldGroup data-invalid={fieldState.invalid}>
                                        <FieldLabel>Employment Type</FieldLabel>
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="grid grid-cols-1 sm:flex"
                                        >
                                            <FieldLabel className="hover:bg-accent cursor-pointer has-[button[data-state=checked]]:border-blue-500 has-[button[data-state=checked]]:bg-blue-50">
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" value="full-time" />
                                                    <FieldContent>
                                                        <FieldTitle className="font-normal">Full-Time</FieldTitle>
                                                    </FieldContent>
                                                </Field>
                                            </FieldLabel>
                                            <FieldLabel className="hover:bg-accent cursor-pointer has-[button[data-state=checked]]:border-blue-500 has-[button[data-state=checked]]:bg-blue-50">
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" value="contract" />
                                                    <FieldContent>
                                                        <FieldTitle className="font-normal">Contract</FieldTitle>
                                                    </FieldContent>
                                                </Field>
                                            </FieldLabel>
                                            <FieldLabel className="hover:bg-accent cursor-pointer has-[button[data-state=checked]]:border-blue-500 has-[button[data-state=checked]]:bg-blue-50">
                                                <Field orientation="horizontal">
                                                    <RadioGroupItem className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" value="probation" />
                                                    <FieldContent>
                                                        <FieldTitle className="font-normal">Probation</FieldTitle>
                                                    </FieldContent>
                                                </Field>
                                            </FieldLabel>
                                        </RadioGroup>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </FieldGroup>
                                )}
                            />

                            <Controller
                                name="manager"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    const selectedEmployee = employees?.find(
                                        employee => employee.employeeId === field.value
                                    ) ?? null
                                    
                                    return (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Manager</FieldLabel>
                                            <Combobox
                                                items={employees}
                                                itemToStringValue={(employee: Employee) => employee.employeeId}
                                                itemToStringLabel={(employee: Employee) => employee.name}
                                                value={selectedEmployee}
                                                onValueChange={(employee) => field.onChange(employee?.employeeId ?? undefined)}
                                            >
                                                <ComboboxInput
                                                    className="h-10"
                                                    placeholder="Select employee name"
                                                />
                                                <ComboboxContent>
                                                    <ComboboxEmpty>No employee found.</ComboboxEmpty>
                                                    <ComboboxList>
                                                        <ComboboxGroup>
                                                            <ComboboxCollection>
                                                                {(employee: Employee) => (
                                                                    <ComboboxItem
                                                                        className="capitalize"
                                                                        key={employee.employeeId}
                                                                        value={employee}
                                                                    >
                                                                        {employee.name}
                                                                    </ComboboxItem>
                                                                )}
                                                            </ComboboxCollection>
                                                        </ComboboxGroup>
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                        </Field>
                                    )
                                }}
                            />

                            <div className="grid grid-cols-1 sm:flex gap-5">
                                <Controller
                                    name="doj"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Date of Joining</FieldLabel>
                                            <Input
                                                {...field}
                                                type="date"
                                                placeholder="Select joining date"
                                                className="bg-transparent rounded-md h-10 hover:bg-accent"
                                            />
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="location"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Work Location</FieldLabel>
                                            <Combobox
                                                items={["Chennai", "Bangalore", "Coimbatore", "Hyderabad", "Mumbai"]}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <ComboboxInput className="h-10" placeholder="Select work location" />
                                                <ComboboxContent>
                                                    <ComboboxEmpty>No location found.</ComboboxEmpty>
                                                    <ComboboxList>
                                                        <ComboboxGroup>
                                                            <ComboboxCollection>
                                                                {(location) => (
                                                                    <ComboboxItem key={location} value={location}>{location}</ComboboxItem>
                                                                )}
                                                            </ComboboxCollection>
                                                        </ComboboxGroup>
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                        </Field>
                                    )}
                                />
                            </div>
                        </FieldGroup>
                    </div>
                    <div className="grid grid-cols-1 sm:flex gap-6 w-full border-b p-5">
                        <div className="w-full sm:w-65 space-y-6">
                            <div>
                                <h2 className="font-semibold text-[16px]">Contact Information</h2>
                                <p className="text-muted-foreground wrap-normal">Internal comments regarding the onboarding process or special requirements.</p>
                            </div>
                        </div>
                        <FieldGroup className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 sm:flex gap-5">
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Work Email</FieldLabel>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="e.g. ananya.rao@company.com"
                                                className="bg-transparent rounded-md h-10 hover:bg-accent"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="phone"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Phone Number</FieldLabel>
                                            <Input
                                                {...field}
                                                type="tel"
                                                placeholder="e.g. +91 98765 43210"
                                                className="bg-transparent rounded-md h-10 hover:bg-accent"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:flex gap-5">
                                <Controller
                                    name="emergencyContactName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Emergency Contact Name</FieldLabel>
                                            {/* <FieldDescription className="text-xs">Person to contact in case of emergency</FieldDescription> */}
                                            <Input
                                                {...field}
                                                placeholder="e.g. Rahul Sharma"
                                                className="bg-transparent rounded-md h-10 hover:bg-accent"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="emergencyContactPhone"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Emergency Contact Phone</FieldLabel>
                                            <Input
                                                {...field}
                                                type="tel"
                                                placeholder="e.g. +91 91234 56789"
                                                className="bg-transparent rounded-md h-10 hover:bg-accent"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FieldGroup>
                    </div>
                    <div className="grid grid-cols-1 sm:flex gap-6 w-full p-5 pb-2.5">
                        <div className="w-full sm:w-65 space-y-6">
                            <div>
                                <h2 className="font-semibold text-[16px]">Administrative Notes</h2>
                                <p className="text-muted-foreground wrap-normal">Internal comments regarding the onboarding process or special requirements.</p>
                            </div>
                        </div>
                        <FieldGroup className="flex-1 space-y-4 h-64">
                            <Controller
                                name="employeeStatus"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Employee Status</FieldLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="px-3 py-5">
                                                <SelectValue placeholder="Select employee status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Employee status</SelectLabel>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="on-leave">On-Leave</SelectItem>
                                                    <SelectItem value="in-active">In-Active</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="notes"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="flex-1 space-y-4 h-32">
                                        <Textarea
                                            {...field}
                                            placeholder="Add any specific instructions for HR or IT..."
                                            className="w-full h-full resize-none hover:bg-accent"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end-safe">
                <Field orientation="horizontal" className="space-x-3 w-fit py-2">
                    <Button onClick={() => form.reset()} variant="outline" className="font-normal">Cancel</Button>
                    <Button type="submit" form="add-employee-form">Save Employee</Button>
                </Field>
            </CardFooter>
        </Card>
    )
}

export default EmployeeForm
