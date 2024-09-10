import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Estilos/CrearEditarTareaAdmin.css';
import AlertSuccess from './AlertSuccess'; // Importa la alerta de éxito
import AlertError from './AlertError'; // Importa la alerta de error

const CrearEditarTareaAdmin = ({ task, onSave, onClose, editMode }) => {
    const [formData, setFormData] = useState(task || {});

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Validar que todos los campos requeridos estén completos
        const { course, title, description, points, startDate, endDate } = formData;
        if (!course || !title || !description || !points || !startDate || !endDate) {
            AlertError({ message: "No puedes crear la tarea con campos vacíos" }); // Muestra error si hay campos vacíos
            return;
        }

        // Validar que la fecha de inicio no sea mayor que la fecha final
        if (new Date(startDate) > new Date(endDate)) {
            AlertError({ message: "Fecha inicial no puede ser mayor a Fecha Final" }); // Muestra error si la fecha inicial es mayor
            return;
        }

        onSave(formData); // Guarda la tarea
        AlertSuccess({ message: editMode ? "Tarea actualizada exitosamente" : "Tarea creada exitosamente" }); // Muestra la alerta de éxito
        onClose(); // Cierra el modal
    };

    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Editar Tarea' : 'Crear Nueva Tarea'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Curso</Form.Label>
                        <Form.Control as="select" name="course" value={formData.course || ''} onChange={handleChange}>
                            <option value="">Seleccione un curso</option>
                            <option value="Curso 1">Curso 1</option>
                            <option value="Curso 2">Curso 2</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" name="description" value={formData.description || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Valor de la tarea</Form.Label>
                        <Form.Control type="number" name="points" value={formData.points || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inicio</Form.Label>
                        <Form.Control type="date" name="startDate" value={formData.startDate || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha de entrega</Form.Label>
                        <Form.Control type="date" name="endDate" value={formData.endDate || ''} onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Cerrar</Button>
                    <Button variant="primary" type="submit">{editMode ? 'Guardar Cambios' : 'Crear Tarea'}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CrearEditarTareaAdmin;
