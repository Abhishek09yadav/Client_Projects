import apiClient from "../config.js";

export const downloadExcel = async () => {
    try {
        return await apiClient.get(`/api/downloadExcel`, {
            responseType: 'blob'
        });
    } catch (err) {
        alert(err.message)
        console.log('error in downloadExcel file')
    }
}