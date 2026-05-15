import { LoginForm, type LoginFormValues } from "@/features/auth/components/login-form"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const LoginPage = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/dashboard"

    const handleLogin = useCallback(async (data: LoginFormValues) => {
        const success = await login(data.email, data.password)
        if (success) {
            navigate(from, { replace: true })
        }
        return success
    }, [login, navigate, from])

    return (
        <LoginForm onSubmit={handleLogin} />
    )
}

export default LoginPage