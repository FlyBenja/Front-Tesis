import React, { useState } from 'react';
import CrearEditarTareaAdmin from '../../Modals/Fuentes/CrearEditarTareaAdmin';
import '../../layout/Admin/TareaGenAdmin.css';

const TareaGenAdmin = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Propuestas de tesis', description: 'Entrega de las propuestas de tesis', points: 35, startDate: '2024-08-11', endDate: '2024-09-11' }
    ]);
    const [currentTask, setCurrentTask] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (task = {}) => {
        setCurrentTask(task);
        setModalOpen(true);
    };

    const saveTask = (task) => {
        const updatedTasks = task.id ? tasks.map(t => t.id === task.id ? task : t) : [...tasks, { ...task, id: tasks.length + 1 }];
        setTasks(updatedTasks);
        setModalOpen(false);
    };

    // Función para formatear las fechas en DD/MM/YYYY
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options); // Formato día-mes-año
    };

    return (
        <div className="tarea-gen-admin">
            <div className="card card-custom">
                <div className="card-header card-header-custom">
                    <button className="btn btn-primary btn-primary-custom" onClick={() => openModal()}>Crear Nueva tarea</button>
                    <select className="form-control form-control-custom float-right form-select">
                        <option>Curso</option>
                        <option>Curso 1</option>
                        <option>Curso 2</option>
                    </select>
                </div>
                <div className="card-body card-body-custom">
                    <ul className="list-group list-group-custom">
                        {tasks.map(task => (
                            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">{task.title}</h5>
                                    <small className="text-muted">{task.description}</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <small className="text-muted mr-3">
                                        {formatDate(task.startDate)} - {formatDate(task.endDate)}
                                    </small>
                                    <span className="badge badge-success mr-3">{task.points} Pts</span>
                                    <button className="btn btn-icon" onClick={() => openModal(task)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
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
                        editMode={Boolean(currentTask.id)}
                    />
                )}
            </div>
        </div>
    );
};

export default TareaGenAdmin;
