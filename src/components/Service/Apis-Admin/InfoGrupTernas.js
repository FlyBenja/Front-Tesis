import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Función para obtener la información del grupo de ternas
export async function getInfoGroupTerna(groupId) {
    try {
        const response = await axios.get(`${BASE_URL}/api/group-asing-Terna/${groupId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data; // Retornamos los datos obtenidos
    } catch (error) {
        console.error('Error al obtener la información del grupo de ternas:', error);
        throw error; // Lanzar el error para manejarlo en el componente
    }
}
