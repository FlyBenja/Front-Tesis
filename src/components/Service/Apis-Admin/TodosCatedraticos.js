import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ternas';

// Función para obtener todos los catedráticos por sede y año
export const TodosCatedraticos = async (sedeId, year) => {
  try {
    const response = await axios.get(`${API_URL}?sede_id=${sedeId}&year=${year}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
      },
    });
    return response.data; // Devuelve los datos de los catedráticos
  } catch (error) {
    console.error('Error al obtener los catedráticos', error);
    throw error;
  }
};
