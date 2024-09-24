import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ternas';

// Función para eliminar un catedrático
export const eliminarCatedratico = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': '*/*',
      },
    });
    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error al eliminar el catedrático', error);
    throw error;
  }
};
