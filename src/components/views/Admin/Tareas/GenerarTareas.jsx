import React, { useEffect, useState } from 'react';
import CrearEditarTareaAdmin from '../../../Modals/Fuentes/CrearEditarTareaAdmin';
import './GenerarTareas.css';
import { getProfile } from '../../../Service/Apis-Admin/PerfilUsuario';
import { getCursosPorSede } from '../../../Service/Apis-Admin/CursosAsignados';
import { getTasksByCourseAndSede } from '../../../Service/Apis-Admin/ListTaskSedeCurso';
import AlertError from '../../../Modals/Fuentes/AlertError';

const GenerarTareas = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState('');
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Estado para controlar si es la primera carga

    const fetchTasks = async () => {
        if (!selectedCurso || !userData || !userData.sede) {
            setTasks([]);  // Limpiar tareas si no hay curso seleccionado o datos de usuario/sede
            if (!isFirstLoad) {
                AlertError({ message: 'Selecciona un curso para ver las tareas.' });
            }
            return;
        }
    
        try {
            const year = new Date().getFullYear(); // Obtiene el año actual
            const tasksData = await getTasksByCourseAndSede(selectedCurso, userData.sede, year);
            
            if (tasksData.length === 0) {  // Verifica si no hay tareas
                setTasks([]);
                if (!isFirstLoad) {  // Solo mostrar alerta si no es la primera carga
                    AlertError({ message: 'No hay tareas para el curso seleccionado.' });
                }
                return;
            }
    
            // Ordenar y formatear las tareas como antes
            const tareasOrdenadas = tasksData
                .map(task => ({
                    ...task,
                    startDate: formatDate(task.taskStart),
                    endDate: formatDate(task.endTask)
                }))
                .sort((a, b) => {
                    if (a.typeTask_id === 1 && b.typeTask_id !== 1) return -1;
                    if (a.typeTask_id === 2 && b.typeTask_id !== 2) return 1;
                    return 0;
                });
    
            setTasks(tareasOrdenadas);
        } catch (error) {
            console.error('Error al recuperar las tareas:', error);
            AlertError({ message: 'Error al recuperar las tareas.' });
        } finally {
            setIsFirstLoad(false); // Cambiar a false después de la primera carga
        }
    };    

    useEffect(() => {
        const fetchProfileAndCursos = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    AlertError({ message: 'No se encontró el token. Por favor, inicia sesión.' });
                    return;
                }
                const profileData = await getProfile(token);
                if (profileData && profileData.sede) {
                    const cursosData = await getCursosPorSede(profileData.sede, token);
                    setCursos(cursosData);
                    setUserData(profileData);
                    if (cursosData.length === 0) {
                        AlertError({ message: 'No existen cursos Asignados' });
                    }
                    const currentMonth = new Date().getMonth() + 1;
                    const defaultCursoId = currentMonth <= 6 ? '1' : '2';
                    setSelectedCurso(defaultCursoId);
                } else {
                    AlertError({ message: 'No se encontró la sede en los datos del perfil.' });
                }
            } catch (error) {
                AlertError({ message: 'No existen cursos Asignados' });
            }
        };
        fetchProfileAndCursos();
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [selectedCurso, userData]);

    const openModal = (task = {}) => {
        setCurrentTask(task);
        setModalOpen(true);
    };

    const saveTask = () => {
        setModalOpen(false);
        fetchTasks(); // Recargar las tareas después de guardar
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            console.error("Fecha recibida no definida");
            return 'Fecha no definida';
        }
        const date = new Date(dateString);
        if (isNaN(date)) {
            console.error("Fecha recibida no válida:", dateString);
            return 'Fecha no válida';
        }
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Ajustar a zona horaria local
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options).replace(/-/g, '/');
    };    

    if (cursos.length === 0) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh', textAlign: 'center' }}>
                <p className="fw-bold fs-4" style={{ color: '#333' }}>No hay cursos Asignados.</p>
                <p className="fw-bold fs-4" style={{ color: '#333' }}>Favor de Comunicarse con la Central.</p>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <h2 className="mb-4">Creación de Tareas</h2>
            <div className="">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                    <button className="btn btn-primary w-100 w-md-auto mb-2 mb-md-0" onClick={() => openModal()}>Crear Nueva Tarea</button>
                    <select className="form-select w-100 w-md-auto" value={selectedCurso} onChange={(e) => setSelectedCurso(e.target.value)}>
                        <option value="">Seleccione un curso</option>
                        {cursos.map(curso => (
                            <option key={curso.course_id} value={curso.course_id}>{curso.courseName}</option>
                        ))}
                    </select>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {tasks.map(task => (
                            <li key={task.task_id} className="list-group-item">
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                    <div>
                                        <h5>{task.title}</h5>
                                        <small>{task.description}</small>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-center">
                                        <small className="me-2">
                                            {task.startDate} - {task.endDate}
                                        </small>
                                        <span className="badge bg-success me-2">{task.note} Pts</span>
                                        <button className="btn btn-outline-warning btn-sm" onClick={() => openModal(task)}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {modalOpen && (
                    <CrearEditarTareaAdmin
                        task={currentTask}
                        onSave={saveTask}
                        onClose={() => setModalOpen(false)}
                        editMode={Boolean(currentTask.task_id)}
                    />
                )}
            </div>
        </div>
    );
};

export default GenerarTareas;
