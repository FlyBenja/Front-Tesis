import axios from 'axios';

const ListSedes = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/sedes', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Asumiendo que se utiliza un token de autenticación
            }
        });
        return response.data;  // Retorna los datos de la respuesta
    } catch (error) {
        console.error('Error al obtener las sedes:', error);
        throw error;  // Lanza el error para ser manejado por quien llama la función
    }
};

export default ListSedes;
