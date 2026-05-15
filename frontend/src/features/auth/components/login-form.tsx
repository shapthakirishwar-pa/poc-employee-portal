import { Controller, useForm } from "react-hook-form";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, KeyRound, LockKeyhole, Mail } from "lucide-react";
import { useCallback, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

// 1. Define the schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid employee email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean()
})

// 2. Extract the type from the schema
export type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({ onSubmit }: { onSubmit: (data: LoginFormValues) => Promise<boolean> }) {
    const [serverError, setServerError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
    })

    const handleFormSubmit = useCallback(async (data: LoginFormValues) => {
        setServerError(null) // Reset server error before submission
        try {
            const success = await onSubmit(data)

            if (!success) {
                setServerError("Invalid email or password. Please try again.")
            }
        } catch (error) {
            console.error("Login error:", error)
            setServerError("An connection error occurred. Please check your network.")
        }
    }, [onSubmit])

    return (
        <Card className="@container h-full flex flex-col gap-[3.5cqh] border-none ring-0 shadow-none bg-transparent transition-all duration-200">
            <div className="flex flex-col flex-1 justify-between gap-[2.8cqh] px-[3.5cqh] py-[0.8cqh]">
                <CardHeader className="p-0 gap-[0.5cqh]">
                    <CardTitle className="text-[2.4cqh] font-semibold">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-[1.6cqh] leading-relaxed text-muted-foreground">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col flex-1 justify-center gap-[2cqh]">
                    <CardContent className="p-0 flex flex-col gap-[2cqh]">
                        {serverError && (
                            <Alert variant="destructive" className="py-[1cqh] text-[1.4cqh] animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="h-[1.6cqh] w-[1.6cqh]" />
                                <AlertDescription className="text-xs">{serverError}</AlertDescription>
                            </Alert>
                        )}
                        <div className="flex flex-col gap-[0.8cqh]">
                            <Label className="uppercase text-muted-foreground font-bold text-[1.4cqh] tracking-wide" htmlFor="email">
                                email address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-[1cqh] top-1/2 h-[1.8cqh] -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@organization.com"
                                    {...register("email")}
                                    className={`pl-[5cqh] h-[5cqh] text-[1.6cqh]! placeholder:text-[1.6cqh] focus-visible:ring-0 placeholder:text-muted-foreground bg-background border-input rounded-[1cqh] ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[1.3cqh] font-medium text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-[0.8cqh]">
                            <Label className="uppercase text-muted-foreground font-bold text-[1.4cqh] tracking-wide" htmlFor="password">
                                Password
                            </Label>
                            <div className="relative">
                                <LockKeyhole className="absolute left-[1cqh] top-1/2 h-[1.8cqh] -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder={"\u2022".repeat(8)}
                                    {...register("password")}
                                    className={`pl-[5cqh] h-[5cqh] text-[1.6cqh]! placeholder:text-[1.6cqh] focus-visible:ring-0 placeholder:tracking-widest placeholder:text-muted-foreground bg-background border-input rounded-[1cqh] ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-[1.3cqh] font-medium text-destructive">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-between text-[1.4cqh]">
                            <div className="flex items-center gap-[0.8cqh]">
                                <Controller
                                    control={control}
                                    name="rememberMe"
                                    render={({ field }) => (
                                        <Checkbox
                                            id="rememberMe"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="h-3 w-3 cursor-pointer"
                                        />
                                    )}
                                />
                                <Label htmlFor="rememberMe" className="text-[1.6cqh] font-normal text-muted-foreground cursor-pointer">
                                    Remember me
                                </Label>
                            </div>
                            <Button variant="link" size="sm" className="p-0 font-normal text-blue-500 h-auto text-[1.6cqh] underline-offset-1">
                                Forgot password?
                            </Button>
                        </div>
                        <div className="flex flex-col gap-[3cqh] mt-auto">
                            <Button type="submit" className="w-full h-[5.5cqh] text-[1.8cqh] font-semibold tracking-wide shadow-sm rounded-[1cqh]" disabled={isSubmitting}>
                                {isSubmitting ? "Loading..." : "Login"}
                            </Button>
                            <div className="flex items-center gap-[1cqh]">
                                <Separator className="flex-1" />
                                <span className="text-[1.2cqh] font-medium uppercase tracking-widest text-muted-foreground/60">
                                    or sign in with
                                </span>
                                <Separator className="flex-1" />
                            </div>
                            <div className="grid grid-cols-2 gap-[1.5cqh]">
                                <Button variant="outline" size="sm" className="h-[4.5cqh] text-[1.6cqh] bg-background rounded-[1cqh]">
                                    <p className="mr-2 font-bold">G</p> Google
                                </Button>
                                <Button variant="outline" size="sm" className="h-[4.5cqh] text-[1.6cqh] bg-background rounded-[1cqh]">
                                    <KeyRound className="mr-2 h-4 w-4 -scale-x-100 -rotate-45" /> SSO
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </form>
            </div>
            <CardFooter className="justify-center text-[1.6cqh] py-[1.6cqh] text-muted-foreground text-center border-t">
                Don't have an account?
                <Button variant="link" size="sm" className="text-blue-500 h-auto text-[1.4cqh] px-[0.5cqh] hover:underline underline-offset-1">
                    Contact IT Support
                </Button>
            </CardFooter>
        </Card>
    );
}