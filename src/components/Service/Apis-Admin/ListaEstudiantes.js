import axios from 'axios';

// Base URL de la API
const API_BASE_URL = 'http://localhost:3000/api';

// Función para obtener la lista de estudiantes según sede, curso y año
export const getStudentsList = async (sede, curso, año) => {
  try {
    // Construye la URL completa utilizando los parámetros recibidos
    const url = `${API_BASE_URL}/sedes/${sede}/cursos/${curso}/usuarios/${año}`;
    
    // Realiza la solicitud GET con el token de autenticación
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté disponible
      }
    });
    
    // Retorna los datos recibidos
    return response.data;
  } catch (error) {
    // Muestra un mensaje de error en consola si la solicitud falla
    console.error('Error al obtener la lista de estudiantes:', error);
    throw error;  // Propaga el error para que pueda ser manejado por el componente que consume este servicio
  }
};
