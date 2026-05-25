import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CircleCheckBig, Lightbulb, ShieldUser, type LucideIcon } from "lucide-react"
import EmployeeForm from "@/features/employees/components/employee-form"

interface ColorCardProps {
    icon: LucideIcon,
    title: string,
    description: string,
    color: string
}

const COLOR_CARDS: ColorCardProps[] = [
    {
        icon: Lightbulb,
        title: "quick tip",
        description: "Corporate emails are automatically verified against the internal domain directory.",
        color: "blue"
    },
    {
        icon: ShieldUser,
        title: "access level",
        description: "Role selection determines initial system permissions and security clearance.",
        color: "amber"
    },
    {
        icon: CircleCheckBig,
        title: "next step",
        description: "Saving will trigger an automatic welcome invite to the employee's inbox.",
        color: "emerald"
    },
]

const COLOR_STYLES = {
    amber: "text-amber-500 bg-amber-50 border-amber-200",
    blue: "text-blue-500 bg-blue-50 border-blue-200",
    emerald: "text-emerald-500 bg-emerald-50 border-emerald-200",
}

function AddEmployeePage() {
    return (
        <div className="space-y-8 px-8">
            <header className="">
                <h1 className="text-2xl font-semibold">Onboard New Team Member</h1>
                <p className="text-muted-foreground">Complete the information below to create a new employee profile in the system.</p>
            </header>

            <EmployeeForm />

            <div className="grid grid-cols-1 sm:flex gap-7 w-full">
                {COLOR_CARDS.map((card) => (
                    <Card className={`shadow-none ring-0 border ${COLOR_STYLES[card.color]}`}>
                        <CardHeader>
                            <card.icon />
                            <span className="text-[16px] capitalize font-semibold">{card.title}</span>
                        </CardHeader>
                        <CardContent className="text-foreground">{card.description}</CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default AddEmployeePage
