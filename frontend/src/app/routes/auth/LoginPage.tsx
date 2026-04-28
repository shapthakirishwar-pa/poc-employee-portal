import { LoginForm } from "@/features/auth/components/login-form"

export const LoginPage = () => {
    return (
        <div className="w-full h-full flex flex-col gap-y-4">
            <LoginForm />

            <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <a href="#" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                </a>{" "}
                    and{" "}
                <a href="#" className="underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                </a>.
            </p>
        </div>
    )
}

export default LoginPage