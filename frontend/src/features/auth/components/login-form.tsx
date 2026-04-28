import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useCallback, useState } from "react";

// 1. Define the schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid employee email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// 2. Extract the type from the schema
type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [serverError, setServerError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const OnSubmit = useCallback(async (data: LoginFormValues) => {
        setServerError(null) // Reset server error before submission
        try {
            const success = await login(data.email, data.password)

            if (success) {
                navigate("/dashboard", { replace: true })
            } else {
                setServerError("Invalid email or password. Please try again.")
            }
        } catch (error) {
            console.error("Login error:", error)
            setServerError("An connection error occurred. Please check your network.")
        }
    }, [login, navigate])

    return (
        <Card className="w-full border-none ring-0 shadow-none bg-transparent">
            <CardHeader className="space-y-1 text-center mb-4">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Welcome Back
                </CardTitle>
                <CardDescription>
                    Enter your employee credentials to access the portal
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(OnSubmit)} className="space-y-6">
                <CardContent className="space-y-4 p-0">
                    {serverError && (
                        <Alert variant="destructive" className="py-2 px-3">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-xs">{serverError}</AlertDescription>
                        </Alert>
                    )}
                    {/* <div className="flex flex-col gap-6"> */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.email && (
                                <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Button variant="link" size="sm" className="px-0 font-normal h-auto text-xs">
                                    Forgot password?
                                </Button>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                                className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.password && (
                                <p className="text-xs font-medium text-destructive">{errors.password.message}</p>
                            )}
                        </div>
                    {/* </div> */}
                </CardContent>
                <CardFooter className="p-0 pt-4">
                    <Button type="submit" className="w-full font-semibold" disabled={isSubmitting}>
                        {isSubmitting ? "Authenticating..." : "Sign In"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}