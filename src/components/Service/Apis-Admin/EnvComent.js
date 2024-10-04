const apiUrl = 'http://localhost:3000/api/create/comentario';

// Función para enviar un comentario
export const enviarComentario = async (comentarioData, token) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Asumiendo que la autenticación es mediante Bearer token
      },
      body: JSON.stringify(comentarioData)
    });

    if (!response.ok) {
      throw new Error('Error al enviar comentario');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en enviarComentario:', error);
    throw error;
  }
};

