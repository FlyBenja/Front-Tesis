import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ternas/activos';

// Función para obtener las ternas activas de una sede específica y un año
export const getActiveTernas = async (sedeId, year) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}?sede_id=${sedeId}&year=${year}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error al obtener las ternas activas:', error);
    if (error.response && error.response.status === 401) {
      // Manejar específicamente el error 401
      throw new Error('Unauthorized: Invalid or expired token');
    }
    throw error; // Relanzar cualquier otro error que no sea 401
  }
};
