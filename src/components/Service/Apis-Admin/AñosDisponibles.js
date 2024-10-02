import axios from 'axios';

const API_URL = 'http://localhost:3000/api/years';

export const getAvailableYears = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Asegúrate de manejar el token de autenticación
      }
    });
    return response.data;  // Devuelve directamente los datos de la respuesta
  } catch (error) {
    console.error('Error al obtener los años disponibles:', error);
    throw error;  // Propaga el error para manejarlo en la interfaz de usuario si es necesario
  }
};

