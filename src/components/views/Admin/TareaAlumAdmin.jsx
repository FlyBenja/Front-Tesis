import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../../layout/Admin/TareaAlumAdmin.css'; // Cambié el nombre del archivo CSS

const TareaAlumAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Propuestas de tesis', description: 'Entrega de las propuestas de tesis', points: 0, startDate: '11/08/2024', endDate: '11/09/2024' },
    { id: 2, title: 'Capítulo 1', description: 'Entrega del capítulo 1 de la tesis', points: 61, startDate: '12/09/2024', endDate: '12/10/2024' },
    { id: 3, title: 'Capítulo 2', description: 'Entrega del capítulo 2 de la tesis', points: 50, startDate: '13/10/2024', endDate: '13/11/2024' },
    { id: 4, title: 'Capítulo 3', description: 'Entrega del capítulo 3 de la tesis', points: 50, startDate: '14/11/2024', endDate: '14/12/2024' }
  ]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getBadgeClass = (points) => {
    return points > 0 ? (points < 61 ? "badge badge-danger" : "badge badge-success") : "d-none";
  };

  const handleNavigate = (taskId) => {
    const taskSelected = tasks.find(task => task.id === taskId);
    const navigationState = { student, task: taskSelected };
    if (taskId === 1) {
      navigate('/admin/propuestatesis', { state: navigationState });
    } else {
      navigate('/admin/tareaindivi', { state: navigationState });
    }
  };

  return (
    <div className="tarea-alum-admin-container">
      <div className="card card-custom">
        <div className="card-header card-header-custom">
          <button className="btn btn-icon" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Regresar
          </button>
          <span>Listado de tareas de {student.nombre}</span>
        </div>
        <div className="card-body card-body-custom">
          <ul className="list-group list-group-custom">
            {tasks.map((task, index) => (
              <li key={task.id} className={`list-group-item ${index === tasks.length - 1 ? 'last-item' : ''}`}>
                <div className="task-content">
                  <h5 className="mb-1">{task.title}</h5>
                  <small className="text-muted">{task.description}</small>
                  <small className="text-muted">{formatDate(task.startDate)} - {formatDate(task.endDate)}</small>
                </div>
                <button 
                  className="btn btn-primary btn-small" 
                  onClick={() => handleNavigate(task.id)}
                >
                  Entrar
                </button>
                <span className={getBadgeClass(task.points)}>{task.points ? `${task.points} Pts` : ''}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TareaAlumAdmin;
