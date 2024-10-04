// UpdateTask.js
import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:3000/api/tareas';

/**
 * Función para actualizar una tarea existente.
 * @param {number} id - ID de la tarea a actualizar.
 * @param {object} taskData - Los datos de la tarea a actualizar.
 * @param {string} token - El token JWT para la autenticación.
 * @returns {Promise<object>} - La respuesta del servidor a la solicitud de actualización de la tarea.
 */
export const updateTask = async (id, taskData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, taskData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; // Retorna la respuesta del servidor
    } catch (error) {
        console.error('Error al actualizar la tarea:', error.response ? error.response.data : error.message);
        throw error; // Propaga el error para manejarlo en el componente
    }
};
