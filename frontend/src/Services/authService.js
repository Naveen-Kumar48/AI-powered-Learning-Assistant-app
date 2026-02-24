    import axiosInstance from "../utils/axiosInstance";
    import { API_PATHS } from "../utils/apiPaths";

const login=async(email,password)=>{
    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email,password});
        return response.data;
    } catch (error) {
        throw error.response?.data||{   message:"An  unknown error occured"};
    }
}

const register=async(username,email,password)=>{
    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{username,email,password});
        return response.data;
    } catch (error) {
        throw error.response?.data||{   message:"An  unknown error occured"};
    }
}

const getProfile=async()=>{
    try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        return response.data;
    } catch (error) {
        throw error.response?.data||{   message:"An  unknown error occured"};
    }
}

const updateProfile=async(name,email)=>{
    try {
        const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE,{name,email});
        return response.data;
    } catch (error) {
        throw error.response?.data||{   message:"An  unknown error occured"};
    }
}

const changePassword=async(oldPassword,newPassword)=>{
    try {
        const response = await axiosInstance.put(API_PATHS.AUTH.CHANGE_PASSWORD,{oldPassword,newPassword});
        return response.data;
    } catch (error) {
        throw error.response?.data||{   message:"An  unknown error occured"};
    }
}

export default {
    login,
    register,
    getProfile,
    updateProfile,
    changePassword
}