import axios from 'axios';

const baseURL = 'http://localhost:3000/api/';

// Función para obtener los tipos de tareas
export const getTaskTypes = async (token) => {
    try {
        const response = await axios.get(`${baseURL}typetaks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;  // Retorna los tipos de tareas obtenidos
    } catch (error) {
        console.error('Error al obtener los tipos de tareas:', error);
        throw error;  // Lanza el error para manejarlo en el componente
    }
}
