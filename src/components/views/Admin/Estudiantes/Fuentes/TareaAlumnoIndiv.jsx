import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../Estilos/TareaAlumnoIndiv.css';
import AlertSuccess from '../../../../Modals/Fuentes/AlertSuccess';
import AlertError from '../../../../Modals/Fuentes/AlertError';
import CalificacionModal from '../../../../Modals/Fuentes/CalificacionModal';  // Importa el nuevo modal
import { enviarComentario } from '../../../../Service/Apis-Admin/EnvComent';  // Importa la función para enviar comentarios

const TareaAlumnoIndiv = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Entrega capítulo 1',
      description:
        'Entrega del capítulo 1 del proyecto final. Este capítulo debe incluir una introducción al tema, los objetivos del proyecto y un resumen de la metodología que se utilizará a lo largo del desarrollo.',
      points: 0,
      startDate: '2024-08-22',
      endDate: '2024-09-22',
    },
  ]);

  const [showCalificacionModal, setShowCalificacionModal] = useState(false);  // Estado para el modal

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getBadgeClass = (points) => {
    return points > 0 ? 'badge badge-success' : 'd-none';
  };

  const handleCommentSubmit = async () => {
    const commentText = document.getElementById('comment').value.trim();
    if (!commentText) {
      AlertError({ message: "Error: El comentario no puede estar vacío." });
      return;
    }
  
    const comentarioData = {
      user_id: student.user_id,  // Asegúrate de que 'user_id' esté disponible en el objeto 'student'
      description: commentText,
      course_id: student.course_id,  // Asegúrate de que 'course_id' esté disponible
      task_id: student.task_id  // Asegúrate de que 'task_id' esté disponible
    };
    
    // Se asume que 'token' se obtiene de alguna manera (localStorage, context, etc.)
    const token = localStorage.getItem('token'); // O manejarlo más seguro desde context o Redux
  
    try {
      const response = await enviarComentario(comentarioData, token);
      AlertSuccess({ message: "Comentario enviado con éxito!" });
      document.getElementById('comment').value = '';  // Limpiar el campo después del envío exitoso
    } catch (error) {
      console.error('Error enviando comentario:', error);
      AlertError({ message: "Error al enviar el comentario." });
    }
  };  

  const handleCalificarClick = () => {
    setShowCalificacionModal(true);  // Mostrar el modal cuando se hace clic en "Calificar"
  };

  const handleCloseModal = () => {
    setShowCalificacionModal(false);  // Cerrar el modal
  };

  return (
    <div className="tarea-alum-indiv-container">
      <div className="card card-custom">
        <div className="card-header card-header-custom">
          <button className="btn btn-icon" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Regresar
          </button>
          <span>Información Tarea {student?.task_id} de Estudiante {student?.userName || 'estudiante'}</span>
        </div>
        <div className="card-body card-body-custom">
          <ul className="list-group list-group-custom">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item">
                <div className="task-content">
                  <h5 className="mb-1">{task.title}</h5>
                  <small className="text-muted">{task.description}</small>
                  <small className="text-muted">
                    {formatDate(task.startDate)} - {formatDate(task.endDate)}
                  </small>
                </div>
                <div className="download-section">
                  <a
                    href="https://github.com/FlyBenja/fronted-historico-tesis/archive/refs/heads/main.zip"
                    className="btn btn-primary"
                    download
                  >
                    <i className="fas fa-download"></i> Descargar
                  </a>
                  <button className="btn btn-secondary btn-calificar" onClick={handleCalificarClick}>
                    Calificar
                  </button>
                </div>
                <hr />
                <div className="comment-section">
                  <label htmlFor="comment">Comentario</label>
                  <textarea
                    id="comment"
                    rows="4"
                    cols="50"
                    placeholder="Escribe un comentario..."
                  ></textarea>
                  <button className="btn btn-success" onClick={handleCommentSubmit}>
                    Enviar Comentario
                  </button>
                </div>
                <span className={getBadgeClass(task.points)}>
                  {task.points ? `${task.points} Pts` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal para ingresar la calificación */}
      {showCalificacionModal && (
        <CalificacionModal show={showCalificacionModal} handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default TareaAlumnoIndiv;
