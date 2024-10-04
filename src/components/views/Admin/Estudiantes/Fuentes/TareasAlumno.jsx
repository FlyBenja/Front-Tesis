import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../Estilos/TareasAlumno.css';
import { getListTaskSede } from '../../../../Service/Apis-Admin/ListTaskSede';

const TareasAlumno = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const year = new Date().getFullYear(); // Obtiene el año actual
    if (student && student.sede) {
      getListTaskSede(student.sede, year) // Añade el parámetro year a la llamada
        .then(tareas => {
          const tareasOrdenadas = tareas.sort((a, b) => {
            if (a.typeTask_id === 1 && b.typeTask_id !== 1) return -1;
            if (a.typeTask_id !== 1 && b.typeTask_id === 1) return 1;
            return 0;
          });
          setTasks(tareasOrdenadas);
        })
        .catch(error => {
          console.error('Error al obtener las tareas:', error);
        });
    }
  }, [student]);

  // Formato de fecha día/mes/año con control de formato "2024-10-30T00:00:00.000Z"
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no definida';

    const [datePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');

    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  };

  const getBadgeClass = (value) => {
    return value > 0 ? (value < 61 ? "badge badge-danger" : "badge badge-success") : "d-none";
  };

  const handleNavigate = (task) => {
    // Crear una copia del objeto student y agregarle el task_id y el course_id
    const studentWithTask = {
      ...student,
      task_id: task.task_id, // Asumiendo que task tiene la propiedad task_id
      course_id: task.course_id // Asumiendo que task tiene la propiedad course_id
    };

    const navigationState = { student: studentWithTask, task };

    // Redirigir a diferentes páginas dependiendo del typeTask_id
    if (task.typeTask_id === 2) {
      navigate('/admin/tareaindivi', { state: navigationState }); // Navegar a 'tareaindivi' si typeTask_id = 2
    } else if (task.typeTask_id === 1) {
      navigate('/admin/propuestatesis', { state: navigationState }); // Navegar a 'propuestatesis' si typeTask_id = 1
    }
  };

  return (
    <div className="tarea-alum-admin-container">
      <div className="card card-custom">
        <div className="card-header card-header-custom">
          <button className="btn btn-icon" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Regresar
          </button>
          <span>Listado de tareas de {student?.userName}</span>
        </div>
        <div className="card-body card-body-custom" style={{height: '530px'}}>
          <ul className="list-group list-group-custom">
            {tasks.map((task, index) => (
              <li key={task.id ? `task-${task.id}` : `task-${index}`} className="list-group-item">
                <div className="task-content">
                  <h5 className="mb-1">{task.title}</h5>
                  <small className="text-muted">{task.description}</small>
                  <small className="text-muted">{formatDate(task.taskStart)} - {formatDate(task.endTask)}</small>
                </div>
                <button className="btn btn-primary btn-small" onClick={() => handleNavigate(task)}>Entrar</button>
                {/* Mostrar punteo solo si el typeTask_id es 2 */}
                {task.typeTask_id === 2 && (
                  <span className={getBadgeClass(task.note)}>{task.note ? `${task.note} Pts` : ''}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TareasAlumno;
