import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AlertSuccess from '../../Modals/Fuentes/AlertSuccess';
import AlertError from '../../Modals/Fuentes/AlertError';
import { getProfile } from '../../Service/Apis-Admin/PerfilUsuario';
import { getCursosPorSede } from '../../Service/Apis-Admin/CursosAsignados';
import { getTaskTypes } from '../../Service/Apis-Admin/typetaks';
import { createTask } from '../../Service/Apis-Admin/CreateTask';
import { updateTask } from '../../Service/Apis-Admin/UpdateTask';

const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().slice(0, 10) : '';
};

const CrearEditarTareaAdmin = ({ onClose, editMode, task, onSave }) => {
    const [cursos, setCursos] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);
    const [formData, setFormData] = useState({
        course: '',
        taskType: '',
        title: '',
        description: '',
        note: '',
        startDate: '',
        endDate: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileAndCursos = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    AlertError({ message: 'Token no encontrado. Inicia sesión de nuevo.' });
                    return;
                }

                const profileData = await getProfile(token);
                if (profileData && profileData.sede) {
                    const cursosData = await getCursosPorSede(profileData.sede, token);
                    setCursos(cursosData);

                    const typesData = await getTaskTypes(token);
                    setTaskTypes(typesData);

                    if (editMode) {
                        setFormData({
                            course: task?.course_id || '',
                            taskType: task?.typeTask_id || '',
                            title: task?.title || '',
                            description: task?.description || '',
                            note: task?.note || '',
                            startDate: formatDate(task?.taskStart),
                            endDate: formatDate(task?.endTask)
                        });
                    }
                } else {
                    AlertError({ message: 'No se encontró la sede en el perfil del usuario.' });
                }
            } catch (error) {
                AlertError({ message: `Error al obtener los datos: ${error.message}` });
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndCursos();
    }, [editMode, task]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { course, title, description, note, startDate, endDate, taskType } = formData;
        if (!course || !title || !description || !note || !startDate || !endDate || !taskType) {
            AlertError({ message: 'No puedes crear la tarea con campos vacíos' });
            return;
        }

        const token = localStorage.getItem('token');
        const profileData = await getProfile(token);
        if (!profileData || !profileData.sede) {
            AlertError({ message: 'Información de sede no disponible. Por favor, intente de nuevo.' });
            return;
        }

        const taskData = {
            course_id: course,
            sede_id: profileData.sede,
            typeTask_id: taskType,
            title: title,
            description: description,
            note: note,
            taskStart: startDate,
            endTask: endDate
        };

        try {
            if (editMode) {
                await updateTask(task.task_id, taskData, token);
                AlertSuccess({ message: 'Tarea actualizada con éxito' });
            } else {
                await createTask(taskData, token);
                AlertSuccess({ message: 'Tarea creada con éxito' });
            }
            onSave();
            onClose();
        } catch (error) {
            console.error('Error al crear/editar la tarea:', error);
            AlertError({ message: 'Error al crear/editar la tarea. Intente de nuevo.' });
        }
    };

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Editar Tarea' : 'Crear Nueva Tarea'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="py-0">
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Curso</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    disabled={editMode} // Desactivar en modo edición
                                >
                                    <option value="">Seleccione un curso</option>
                                    {cursos.map((curso) => (
                                        <option key={curso.course_id} value={curso.course_id}>
                                            {curso.courseName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Tarea</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="taskType"
                                    value={formData.taskType}
                                    onChange={handleChange}
                                    disabled={editMode} // Desactivar en modo edición
                                >
                                    <option value="">Seleccione el tipo de tarea</option>
                                    {taskTypes.map((type) => (
                                        <option key={type.typeTask_id} value={type.typeTask_id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Valor de la tarea (Nota)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    disabled={editMode} // Desactivar en modo edición
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de Inicio</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de entrega</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Cerrar</Button>
                    <Button variant="primary" type="submit">
                        {editMode ? 'Guardar Cambios' : 'Crear Tarea'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CrearEditarTareaAdmin;
