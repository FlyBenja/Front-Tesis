import React, { useState } from 'react';
import CrearEditarTareaAdmin from '../../../Modals/Fuentes/CrearEditarTareaAdmin';
import './GenerarTareas.css';

const GenerarTareas = () => {
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

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options); // Formato día-mes-año
    };

    return (
        <div className="container my-4">
            <h2 className="mb-4">Creación de Tareas</h2>
            <div className="card">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                    {/* Botón para crear una nueva tarea */}
                    <button className="btn btn-primary w-100 w-md-auto mb-2 mb-md-0" onClick={() => openModal()}>Crear Nueva tarea</button>

                    {/* Selector de cursos alineado a la derecha */}
                    <select className="form-select w-100 w-md-auto">
                        <option>Curso</option>
                        <option>Curso 1</option>
                        <option>Curso 2</option>
                    </select>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {tasks.map(task => (
                            <li key={task.id} className="list-group-item">
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                    <div>
                                        <h5>{task.title}</h5>
                                        <small>{task.description}</small>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-center">
                                        <small className="me-2">
                                            {formatDate(task.startDate)} - {formatDate(task.endDate)}
                                        </small>
                                        <span className="badge bg-success me-2">{task.points} Pts</span>
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
                        editMode={Boolean(currentTask.id)}
                    />
                )}
            </div>
        </div>
    );
};

export default GenerarTareas;
