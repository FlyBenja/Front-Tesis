import axios from 'axios';

const API_URL = 'http://localhost:3000/api/groupTerna';

// Función para obtener los grupos de ternas
export const getGroupsTernas = async (sedeId, year) => {
  const token = localStorage.getItem('token'); // Asegúrate de obtener el token almacenado
  if (!token) {
    console.error('No token found');
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        sede_id: sedeId,
        year: year
      },
      headers: {
        'Authorization': `Bearer ${token}`,  // Asegúrate de que el token se incluya correctamente
        'Content-Type': 'application/json'
      }
    });
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error al obtener los grupos de ternas:', error);
    throw error;
  }
};
