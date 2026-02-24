import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const getDocuments = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.DOCUMENTS.GET_DOCUMENTS);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to get documents" };
    }
}