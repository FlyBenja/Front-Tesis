import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

export const getTasksByCourseAndSede = async (course, sede, year) => {
    try {
        const token = localStorage.getItem('token');  // Obtén el token del localStorage
        // Incluye el año en la URL de la API
        const response = await axios.get(`${baseURL}/tareas/curso/${sede}/${course}/${year}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Incluye el token en los headers
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

export default getTasksByCourseAndSede;
