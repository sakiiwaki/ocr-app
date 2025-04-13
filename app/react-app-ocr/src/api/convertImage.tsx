import axios from 'axios';

const API_URL = 'http://localhost:8000/convert'; // FastAPIのエンドポイント

export const convertImage = async (formData: FormData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message || error;
    }
};
