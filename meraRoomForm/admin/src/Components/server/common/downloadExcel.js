import apiClient from "../config.js";

export const downloadExcel = async () => {
    try {
        return await apiClient.get(`/api/downloadExcel`, {
            responseType: 'blob'
        });
    } catch (err) {
        throw err;
    }
}