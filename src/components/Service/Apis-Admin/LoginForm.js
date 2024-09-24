import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/login';

// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    if (response.data.token) {
      // Almacena solo el token en localStorage
      localStorage.setItem('token', response.data.token);
    }
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Manejo de errores
    throw new Error('Error de inicio de sesión', error);
  }
};
