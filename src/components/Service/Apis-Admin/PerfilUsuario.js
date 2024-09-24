import axios from 'axios';

const API_URL = 'http://localhost:3000/api/usuarios/perfil';

export const getProfile = async () => {
  const token = localStorage.getItem('token'); // Asegúrate de obtener el token almacenado
  if (!token) {
    console.error('No token found');
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`  // Asegúrate de que el token se incluya correctamente
      }
    });
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    if (error.response && error.response.status === 401) {
      // Manejar específicamente el error 401
      throw new Error('Unauthorized: Invalid or expired token');
    }
    throw error; // Relanzar cualquier otro error que no sea 401
  }
};
