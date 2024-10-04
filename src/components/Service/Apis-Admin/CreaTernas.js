import axios from 'axios';

const API_URL = 'http://localhost:3000/api/terna-asign-group/create';

export const creaTernas = async (ternas, token) => {
    try {
        const response = await axios.post(API_URL, ternas, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear ternas:', error);
        throw error;
    }
};
