import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:3000/api/tareas';

/**
 * Función para crear una nueva tarea.
 * @param {Object} taskData - Los datos de la tarea a crear.
 * @param {string} token - El token JWT para la autenticación.
 * @returns {Promise<Object>} - La respuesta del servidor a la solicitud de creación de la tarea.
 */
export const createTask = async (taskData, token) => {
    try {
        const response = await axios.post(API_URL, taskData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  // Retorna la respuesta del servidor
    } catch (error) {
        console.error('Error al crear la tarea:', error.response ? error.response.data : error.message);
        throw error;  // Propaga el error para manejarlo en el componente
    }
};
