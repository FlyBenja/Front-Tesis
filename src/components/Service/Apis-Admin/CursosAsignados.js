import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Función para obtener cursos por sede
export const getCursosPorSede = async (sedeId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/cursosPorSede/${sedeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data; // Asumiendo que los cursos están en 'data.data'
  } catch (error) {
    console.error('Error al obtener cursos por sede:', error);
    throw error;
  }
};
