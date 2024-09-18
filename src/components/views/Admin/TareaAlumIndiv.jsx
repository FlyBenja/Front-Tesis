import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../../layout/Admin/TareaAlumIndiv.css';
import AlertSuccess from '../../Modals/Fuentes/AlertSuccess';
import AlertError from '../../Modals/Fuentes/AlertError';

const TareaAlumIndiv = () => {
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

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getBadgeClass = (points) => {
    return points > 0 ? 'badge badge-success' : 'd-none';
  };

  const handleCommentSubmit = () => {
    const commentText = document.getElementById('comment').value.trim();
    if (commentText) {
      AlertSuccess({ message: "Comentario enviado con éxito!" });
    } else {
      AlertError({ message: "Error: El comentario no puede estar vacío." });
    }
  };

  return (
    <div className="tarea-alum-indiv-container">
      <div className="card card-custom">
        <div className="card-header card-header-custom">
          <button className="btn btn-icon" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Regresar
          </button>
          <span>Listado de tareas de {student?.nombre || 'estudiante'}</span>
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
                <div className="download-section" style={{ marginTop: '25px' }}>
                  <a
                    href="https://github.com/FlyBenja/fronted-historico-tesis/archive/refs/heads/main.zip"
                    className="btn btn-primary"
                    download
                  >
                    <i className="fas fa-download"></i> Descargar
                  </a>
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
                  <button className="btn btn-success" style={{ marginTop: '10px' }} onClick={handleCommentSubmit}>
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
    </div>
  );
};

export default TareaAlumIndiv;
