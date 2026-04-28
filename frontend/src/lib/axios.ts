import axios from "axios"

export const is_MOCK: boolean = import.meta.env.VITE_USE_MOCK === "true"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || "Something went wrong"

        if (error.response && error.response.status === 401) {
            localStorage.removeItem("authToken")
            localStorage.removeItem("authUser")
            window.location.href = "/login"
        }

        console.error(message)
        return Promise.reject(error)
    }
)