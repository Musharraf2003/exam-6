import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
});
instance.interceptors.request.use(
    (request) => {
        request.headers["Authorization"] = window.location.pathname.includes("dashboard") ? `Bearer ${localStorage.getItem("token")}` : null
        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)


export { instance }