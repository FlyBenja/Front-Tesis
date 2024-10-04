import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tareas/'; // URL base para la API de tareas

// Función para obtener las tareas por sede y año
export const getListTaskSede = async (sedeId, year) => {
  const token = localStorage.getItem('token'); // Obtener el token almacenado
  if (!token) {
    console.error('No token found');
    throw new Error('No token found');
  }

  try {
    // Concatenar el id de la sede y el año a la URL
    const response = await axios.get(`${API_URL}${sedeId}/${year}`, {
      headers: {
        'Authorization': `Bearer ${token}`  // Incluir el token en el encabezado
      }
    });
    return response.data; // Devolver los datos de la respuesta
  } catch (error) {
    console.error(`Error al obtener las tareas para la sede ${sedeId} y el año ${year}:`, error);
    if (error.response && error.response.status === 401) {
      // Manejar específicamente el error 401
      throw new Error('Unauthorized: Invalid or expired token');
    }
    throw error; // Relanzar cualquier otro error que no sea 401
  }
};
