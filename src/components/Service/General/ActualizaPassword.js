import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/updatePassword';

export const updatePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem('token'); // Asegúrate de obtener el token almacenado
  if (!token) {
    console.error('No token found');
    throw new Error('No token found');
  }

  try {
    const response = await axios.put(API_URL, {
      currentPassword: currentPassword,
      newPassword: newPassword
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // Asegúrate de que el token se incluya correctamente
      }
    });

    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    if (error.response && error.response.status === 401) {
      // Manejar específicamente el error 401
      throw new Error('Unauthorized: Invalid or expired token');
    } else if (error.response && error.response.status === 400) {
      // Manejar específicamente errores de validación u otros errores cliente
      throw new Error(`Error: ${error.response.data.message}`);
    }
    throw error; // Relanzar cualquier otro error que no sea 401 o 400
  }
};
