import axios from 'axios'; // Asegúrate de incluir esta línea en la parte superior del archivo

const API_URL = 'http://localhost:3000/api/bitacora';

// Función para obtener bitácoras por sede_id
export const getBitacorasBySede = async (sede_id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${sede_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`  // Asegúrate de enviar el token de autenticación
      }
    });
    return response.data.logs;  // Asumiendo que la respuesta tiene un campo "logs"
  } catch (error) {
    console.error('Error al obtener las bitácoras:', error);
    throw error;
  }
};
