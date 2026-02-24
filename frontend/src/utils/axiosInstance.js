import axios from "axios";
import { Base_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: Base_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
});


//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if(error.response.status === 500){
                const eeror=("Server error... Please try again later")
                toast.error(error)
            }
        }else if(error.code === "ECONNABORTED"){
            const eeror=("Server error... Please try again later")
            console.error("Request timeout.Please try again")
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;