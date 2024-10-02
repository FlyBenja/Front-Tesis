import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

export const getTasksByCourseAndSede = async (course, sede) => {
    try {
        const token = localStorage.getItem('token');  // Obtén el token del localStorage
        const response = await axios.get(`${baseURL}/tareas/curso/${sede}/${course}`, {
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
