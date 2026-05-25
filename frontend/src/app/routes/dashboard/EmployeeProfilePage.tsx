import { cloneElement, isValidElement, type ReactElement } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEmployees } from "@/features/employees/hooks/useEmployees"
import { Building2, Camera, CheckCircle2, Copy, Download, ExternalLink, History, Info, Mail, MapPin, MoreVertical, Pencil, Phone, User } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


function EmployeeProfilePage() {
    const { employeeId } = useParams()
    const navigate = useNavigate()
    const { employee, loading, error } = useEmployees(employeeId)
    const leaves = []

    if (loading) return <div className="p-8 text-center text-muted-foreground font-medium">Loading profile...</div>
    if (error) return <div className="p-8 text-center text-destructive">{error}</div>

    const initials = employee.name.split(" ").map(part => part[0]).join("").toUpperCase()

    return (
        <div className="mt-4 space-y-8">
            <div className="flex-1">
                <div className="max-w-7xl mx-auto space-y-6 pb-10">
                
                    {/* Hero Profile Card */}
                    <Card className="shadow-xs overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                    <div className="relative group cursor-pointer">
                                        <Avatar className="h-32 w-32 rounded-xl border-4 border-white shadow-md">
                                            <AvatarImage src="" alt={employee.name} />
                                            <AvatarFallback className="bg-foreground text-white text-3xl font-bold rounded-xl">
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button size="icon" variant="secondary" className="absolute -bottom-2.5 -right-2.5 h-8 w-8 rounded-full shadow-lg border-2 border-white cursor-pointer">
                                            <Camera className="size-4" />
                                        </Button>
                                    </div>
                                
                                    <div className="text-center md:text-left space-y-2 mt-2">
                                        <div className="flex items-center justify-center md:justify-start gap-3">
                                            <h1 className="text-3xl font-bold tracking-tight text-foreground">{employee.name}</h1>
                                            <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50">Active</Badge>
                                        </div>
                                        <p className="text-foreground/70 font-medium">{employee.role} • <span>{employee.department}</span></p>
                                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-muted-foreground pt-1">
                                            <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {employee.workLocation || "Remote"}</span>
                                            <span className="flex items-center gap-1.5"><Mail className="size-4" /> {employee.email}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button className="gap-2 px-6 flex items-center py-4">
                                        <Pencil className="size-4" />
                                        <span>Edit Profile</span>
                                    </Button>
                                    <Button variant="outline" size="icon" className="text-muted-foreground">
                                        <MoreVertical className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Grid Layout for Widgets */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Left Column (8 units) */}
                        <div className="lg:col-span-8 space-y-6">
                        
                            {/* Personal Info Widget */}
                            <Card className="shadow-xs p-0">
                                <CardHeader className="py-4 flex flex-row items-center justify-between border-b bg-accent">
                                    <CardTitle className="text-lg flex items-center gap-2 font-semibold">
                                        <span>Personal Info</span>
                                    </CardTitle>
                                    <Info className="size-5 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="grid sm:grid-cols-2 gap-x-12 gap-y-6 pb-4">
                                    {/* <InfoBlock label="Full Name" value={employee.name} /> */}
                                    <InfoBlock label="Date of Birth" value="October 14, 1992 (31 yrs)" />
                                    <InfoBlock label="Gender" value="Male" />
                                    <InfoBlock label="Nationality" value="India" />
                                    <InfoBlock label="Martial Status" value="Single" />
                                    <div className="sm:col-span-2 space-y-2">
                                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Language Proficiency</p>
                                        <div className="flex gap-2">
                                        <Badge variant="outline" className="bg-accent text-muted-foreground">English (Native)</Badge>
                                        <Badge variant="outline" className="bg-accent text-muted-foreground">Tamil (Native)</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Employment Information Widget */}
                            <Card className="shadow-xs p-0">
                                <CardHeader className="py-4 bg-accent flex flex-row items-center justify-between border-b">
                                    <CardTitle className="text-lg flex items-center gap-2 font-semibold">
                                        <span>Employment Information</span>
                                    </CardTitle>
                                    <History className="size-5 text-muted-foreground" />
                                    {/* <Button variant="ghost" size="icon" className="text-muted-foreground">
                                    </Button> */}
                                </CardHeader>
                                <CardContent className="space-y-8 pb-4">
                                    <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                                        <InfoBlock label="Employee ID" value={employee.employeeId} />
                                        <InfoBlock label="Department" value={employee.department} />
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Manager</p>
                                            <div className="flex items-center gap-2 pt-1">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="text-[10px] bg-neutral-200">AM</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-semibold">{employee.reportingManager || "Arun Kumar"}</span>
                                            </div>
                                        </div>
                                        <InfoBlock label="Date of Joining" value={`${employee.joinedDate} (0.4 years)`} />
                                    </div>
                                    
                                    {/* Location Sub-box */}
                                    <div className="group cursor-pointer rounded-lg border border-neutral-100 hover:bg-accent bg-neutral-50/50 p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white p-2 rounded-md shadow-sm border border-neutral-100">
                                                <Building2 className="size-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">Chennai HQ</p>
                                                <p className="text-xs text-muted-foreground">MEZ Office, OMR Road, Chennai</p>
                                            </div>
                                        </div>
                                        <ExternalLink className="size-4 text-muted-foreground group-hover:text-blue-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column (4 units) */}
                        <div className="lg:col-span-4 space-y-6">
                        
                            {/* Profile Strength Widget */}
                            <Card className="bg-accent-foreground text-accent border-none shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg">Profile Strength</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span>Completeness</span>
                                            <span>85%</span>
                                        </div>
                                        <Progress value={85} className="h-1.5 bg-muted/50" />
                                    </div> */}
                                    <p className="text-xs text-blue-100 leading-relaxed">
                                        Your profile is almost complete. Adding your emergency contact will reach 100%.
                                    </p>
                                    <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-neutral-100 font-bold">
                                        Verify Documents
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Contact Information Widget */}
                            <Card className="shadow-xs p-0">
                                <CardHeader className="bg-accent flex flex-row items-center justify-between border-b py-4">
                                    <CardTitle className="flex items-center gap-2 font-semibold">
                                        <span>Contact Information</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-5 pb-4">
                                    <ContactItem icon={<Mail />} label="Work Email" value={employee.email} hasCopy />
                                    <ContactItem icon={<Phone />} label="Phone Number" value="+91 98765 43210" isVerified />
                                    
                                    {/* Emergency Contact Box */}
                                    <div className="rounded-lg bg-orange-50 border border-orange-100 p-4 mt-2">
                                        <div className="flex items-center gap-2 text-orange-700 mb-2">
                                        <span className="text-lg">☀️</span>
                                        <p className="text-xs font-bold uppercase tracking-wider">Emergency Contact</p>
                                        </div>
                                        <div className="flex justify-between items-start">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-bold text-neutral-900">Anand Kumar</p>
                                            <p className="text-xs text-neutral-500">(Father)</p>
                                        </div>
                                        <p className="text-sm font-bold text-neutral-900">+91 90000 11111</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-12">
                            <Card className="p-0 gap-0 min-h-100">
                                <CardHeader className="p-4 px-6 flex items-center justify-between">
                                    <CardTitle>Recent Leave History</CardTitle>
                                    <Button variant="outline" className="rounded-lg">
                                        <Download className="size-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-0 h-full w-full">
                                    <Table className="h-full w-full">
                                        <TableHeader className="bg-accent">
                                            <TableRow className="uppercase tracking-wider">
                                                <TableHead className="p-4 font-bold text-muted-foreground">Leave Type</TableHead>
                                                <TableHead className="p-4 font-bold text-muted-foreground">Duration</TableHead>
                                                <TableHead className="p-4 font-bold text-muted-foreground">Days</TableHead>
                                                <TableHead className="p-4 font-bold text-muted-foreground">Status</TableHead>
                                                <TableHead className="p-4 font-bold text-muted-foreground text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="h-full w-full">
                                            {leaves.length > 0
                                                ? (
                                                <div>
                                                </div>)
                                                : (
                                                <TableRow className="h-100 w-full text-center pointer-events-none">
                                                    <TableCell className="text-muted-foreground" colSpan={5}>Service Unavailable</TableCell>
                                                </TableRow>)}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// function ProfileItem({ label, value, isMono }: { label: string, value: string, isMono?: boolean }) {
//     return (
//         <div className="space-y-1">
//             <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{label}</p>
//             <p className={`text-sm font-semibold ${isMono ? 'font-mono text-primary' : 'text-foreground'}`}>{value}</p>
//         </div>
//     )
// }

function InfoBlock({ label, value }: { label: string, value: string }) {
    return (
        <div className="space-y-1">
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-neutral-900">{value}</p>
        </div>
    )
}

function ContactItem({ icon, label, value, hasCopy, isVerified }: { icon: React.ReactNode, label: string, value: string, hasCopy?: boolean, isVerified?: boolean }) {
    return (
        <div className="flex items-start gap-3">
        <div className="bg-neutral-50 p-2 rounded-md border border-neutral-100 text-blue-600">
            {isValidElement(icon) &&
                cloneElement(icon as ReactElement<{className?: string}>, {
                    className: twMerge("h-4 w-4", (icon.props as any)?.className)
                })}
        </div>
        <div className="flex-1 space-y-0.5">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{label}</p>
            <p className="text-sm font-semibold text-neutral-900 truncate">{value}</p>
        </div>
        <div className="flex gap-1 pt-4">
            {hasCopy && <Copy className="h-3.5 w-3.5 text-neutral-300 cursor-pointer hover:text-neutral-500" />}
            {isVerified && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
        </div>
        </div>
    )
}

export default EmployeeProfilePage