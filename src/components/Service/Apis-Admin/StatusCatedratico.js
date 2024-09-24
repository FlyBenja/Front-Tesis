import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ternas';

// Función para cambiar el estado de un catedrático (habilitado/deshabilitado)
export const toggleCatedraticoStatus = async (id, habilitado) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/status`, {
      activoTerna: !habilitado,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error al cambiar el estado del catedrático', error);
    throw error;
  }
};
