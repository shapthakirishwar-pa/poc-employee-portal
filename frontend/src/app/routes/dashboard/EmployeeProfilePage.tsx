import { cloneElement, isValidElement, type ReactElement } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEmployees } from "@/features/employees/hooks/useEmployees"
import { ArrowLeft, Briefcase, Building2, Calendar, Camera, CheckCircle2, Copy, ExternalLink, FileText, History, LayoutGrid, Mail, MapPin, MoreVertical, Pencil, Phone, User } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { Progress } from "@/components/ui/progress"


function EmployeeProfilePage() {
    const { employeeId } = useParams()
    const navigate = useNavigate()
    const { employee, loading, error } = useEmployees(employeeId)

    if (loading) return <div className="p-8 text-center text-muted-foreground font-medium">Loading profile...</div>
    if (error) return <div className="p-8 text-center text-destructive">{error}</div>

    const initials = employee.name.split(" ").map(part => part[0]).join("").toUpperCase()

    return (
        <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* <header className="flex-none p-2 space-y-4">
                <Breadcrumb>
                    <BreadcrumbList className="text-muted-foreground">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin/users" className="cursor-pointer">Employees</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-foreground">{employee.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">Employee Profile</h1>
                </div>
                <div className="flex w-full items-center justify-end gap-2">
                    <Button variant="outline" size="sm">Download CV</Button>
                </div>
            </div>
        
            <Card className="border-none shadow-sm bg-linear-to-br from-primary/5 via-background to-background">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative group">
                            <Avatar className="h-28 w-28 rounded-2xl border-4 border-background shadow-xl">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold rounded-2xl">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <button className="cursor-pointer absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Camera className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                    <h2 className="text-3xl font-bold tracking-tight">{employee.name}</h2>
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10 capitalize">
                                        {employee.status.toLowerCase()}
                                    </Badge>
                                </div>
                                <p className="text-lg text-muted-foreground font-medium">{employee.role} • {employee.department}</p>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Mail className="h-4 w-4" />
                                    {employee.email}
                                </div>
                                {/* <div>
                                    <MapPin className="h-4 w-4" />
                                    {employee.location}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    {employee.joinedDate}
                                </div>
                            </div>

                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-12 p-0 space-x-6">
                                    <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-2">Overview</TabsTrigger>
                                    <TabsTrigger value="employment" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-2">Work Details</TabsTrigger>
                                    <TabsTrigger value="skills" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-2">Skills</TabsTrigger>
                                </TabsList>

                                <ScrollArea className="flex-1 w-full px-1">
                                    <div className="pb-10 pt-6">
                                        <TabsContent value="overview" className="mt-0 space-y-6 outline-none">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <Card>
                                                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                                        <div className="space-y-1">
                                                            <CardTitle className="text-base">Personal Details</CardTitle>
                                                            <CardDescription>Legal and biological information.</CardDescription>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </CardHeader>
                                                    <CardContent className="grid gap-4">
                                                        <ProfileItem label="Date of Birth" value={'employee.dob'} />
                                                        <ProfileItem label="Gender" value={'employee.gender'} />
                                                        <ProfileItem label="Current Address" value={'employee.currentAddress'} />
                                                    </CardContent>
                                                </Card>

                                                <Card>
                                                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                                        <div className="space-y-1">
                                                            <CardTitle>Contact Information</CardTitle>
                                                            <CardDescription>Personal and emergency reaching points.</CardDescription>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </CardHeader>
                                                    <CardContent className="grid gap-4">
                                                        <ProfileItem label="Personal Email" value={'employee.personalEmail'} />
                                                        <ProfileItem label="Phone Number" value={'employee.phoneNumber'} />
                                                        <ProfileItem label="Emergency Contact" value={'employee.emergencyContact'} />
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="employment" className="mt-0 space-y-6 outline-none">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-base">Work Information</CardTitle>
                                                    <CardDescription>Official employment and organizational mapping.</CardDescription>
                                                </CardHeader>
                                                <CardContent className="grid md:grid-cols-3 gap-8">
                                                    <div className="space-y-4">
                                                        <ProfileItem label="Employee ID" value={employee.employeeId} isMono />
                                                        <ProfileItem label="Role" value={employee.role} />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <ProfileItem label="Reporting Manager" value={'employee.reportingManager'} />
                                                        <ProfileItem label="Official Email" value={'employee.officialEmail'} />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <ProfileItem label="Work Location" value={'employee.workLocation'} />
                                                        <ProfileItem label="Current Project" value={'employee.currentProject'} />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        <TabsContent value="skills" className="mt-0 space-y-6 outline-none">
                                            <Card>
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                                <div className="space-y-1">
                                                    <CardTitle className="text-base">Skills & Expertise</CardTitle>
                                                    <CardDescription>Core technical competencies and experience.</CardDescription>
                                                </div>
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <Pencil className="h-3 w-3" /> Edit Skills
                                                </Button>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {[].map(skill => (
                                                        <Badge key={skill} variant="secondary" className="px-3 py-1 bg-primary/5 text-primary border-primary/10">
                                                            {skill}
                                                        </Badge>
                                                        ))}
                                                    </div>
                                                    <Separator />
                                                    <ProfileItem label="Experience Level" value={'employee.expLevel'} />
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    </div>
                                </ScrollArea>
                            </Tabs>
                        </div>
                    </div>
                </CardContent>
            </Card>
        */}
            <ScrollArea className="flex-1 px-6">
                <div className="max-w-7xl mx-auto space-y-6 pb-10">
                
                {/* Hero Profile Card */}
                <Card className="border-neutral-200 shadow-sm overflow-hidden">
                    <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative group">
                            <Avatar className="h-32 w-32 rounded-xl border-4 border-white shadow-md">
                            <AvatarImage src="" alt={employee.name} />
                            <AvatarFallback className="bg-neutral-900 text-white text-3xl font-bold rounded-xl">
                                {initials}
                            </AvatarFallback>
                            </Avatar>
                            <Button size="icon" variant="secondary" className="absolute -bottom-2.5 -right-2.5 h-8 w-8 rounded-full shadow-lg border-2 border-white cursor-pointer">
                            <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="text-center md:text-left space-y-2 mt-2">
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">{employee.name}</h1>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50">Active</Badge>
                            </div>
                            <p className="text-neutral-600 font-medium">{employee.role} • <span className="text-neutral-400">{employee.department}</span></p>
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-neutral-500 pt-1">
                                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {employee.workLocation || "Remote"}</span>
                                <span className="flex items-center gap-1.5 text-blue-600 underline underline-offset-4 decoration-blue-200"><Mail className="h-4 w-4" /> {employee.email}</span>
                            </div>
                        </div>
                        </div>

                        <div className="flex items-center gap-2">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-6">
                            <Pencil className="h-4 w-4" /> Edit Profile
                        </Button>
                        <Button variant="outline" size="icon" className="text-neutral-500">
                            <MoreVertical className="h-4 w-4" />
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
                    <Card className="border-neutral-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2 font-bold">
                            <User className="h-5 w-5 text-blue-600" /> Personal Info
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-blue-600 gap-1 text-xs font-semibold">
                            <Pencil className="h-3 w-3" /> Modify
                        </Button>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                            <InfoBlock label="Full Name" value={employee.name} />
                            <InfoBlock label="Date of Birth" value="March 14, 1990" />
                            <InfoBlock label="Gender" value="Male" />
                            <InfoBlock label="Nationality" value="India" />
                            <div className="sm:col-span-2 space-y-2">
                                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Language Proficiency</p>
                                <div className="flex gap-2">
                                <Badge variant="outline" className="bg-neutral-50 text-neutral-600">English (Native)</Badge>
                                <Badge variant="outline" className="bg-neutral-50 text-neutral-600">Tamil (Native)</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Work Details Widget */}
                    <Card className="border-neutral-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2 font-bold">
                            <Briefcase className="h-5 w-5 text-blue-600" /> Work Details
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="text-neutral-400"><History className="h-4 w-4" /></Button>
                        </CardHeader>
                        <CardContent className="space-y-8">
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
                        <div className="rounded-lg border border-neutral-100 bg-neutral-50/50 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-md shadow-sm border border-neutral-100">
                                <Building2 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900">Chennai HQ</p>
                                <p className="text-xs text-neutral-500">MEZ Office, OMR Road, Chennai</p>
                            </div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-neutral-300" />
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

                    {/* Contact Widget */}
                    <Card className="border-neutral-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg flex items-center gap-2 font-bold text-neutral-900">
                            <FileText className="h-5 w-5 text-blue-600" /> Contact
                        </CardTitle>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-400"><LayoutGrid className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-400"><Pencil className="h-4 w-4" /></Button>
                        </div>
                        </CardHeader>
                        <CardContent className="space-y-5">
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
                </div>
                </div>
            </ScrollArea>
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