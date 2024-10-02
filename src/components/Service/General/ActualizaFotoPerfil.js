import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/updateProfilePhoto';

export const updateProfilePhoto = async (file) => {
  const token = localStorage.getItem('token'); // Asegúrate de obtener el token almacenado
  if (!token) {
    console.error('No token found');
    throw new Error('No token found');
  }

  const formData = new FormData();
  formData.append('profilePhoto', file);

  try {
    const response = await axios.put(API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error al actualizar la foto de perfil:', error);
    if (error.response && error.response.status === 401) {
      // Manejar específicamente el error 401
      throw new Error('Unauthorized: Invalid or expired token');
    }
    throw error; // Relanzar cualquier otro error que no sea 401
  }
};
