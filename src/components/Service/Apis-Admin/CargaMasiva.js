import axios from 'axios';

const API_URL = 'http://localhost:3000/api/usuarios/cargaMasiva';

// Función para la carga masiva de usuarios
export const CargaMasiva = async (formData, token) => {
  try {
    // Configuración de headers
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        // No necesitas especificar 'Content-Type': 'multipart/form-data'
        // Axios lo hace automáticamente cuando detecta un objeto FormData
      }
    };

    // Realiza la solicitud POST con axios
    const response = await axios.post(API_URL, formData, config);

    // Verifica si la respuesta contiene datos y devuelve
    if (response.data) {
      return response.data; // Devuelve los datos de la respuesta
    }
  } catch (error) {
    // Manejo de errores más detallado
    throw new Error(error.response ? error.response.data.message : 'Error en la carga masiva');
  }
};
