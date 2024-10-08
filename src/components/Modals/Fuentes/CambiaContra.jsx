import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Estilos/CambiaContra.css';
import AlertSuccess from './AlertSuccess'; // Importa el componente de alerta de éxito
import AlertError from '../../Modals/Fuentes/AlertError'; // Importa el componente de alerta de error
import { updatePassword } from '../../Service/General/ActualizaPassword'; // Asegúrate de que la ruta es correcta

const CambiaContra = ({ show, onHide }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    // Limpia los campos cuando el modal se cierra o abre
    useEffect(() => {
        if (show) {
            setCurrentPassword('');
            setNewPassword('');
            setRepeatPassword('');
        }
    }, [show]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (newPassword !== repeatPassword) {
            AlertError({ message: "Nueva Contraseña y Repetir Contraseña no son iguales" });
        } else if (currentPassword === newPassword) {
            AlertError({ message: "Nueva Contraseña no puede ser igual a tu Contraseña Actual" });
        } else {
            try {
                const data = await updatePassword(currentPassword, newPassword);
                AlertSuccess({ message: "Contraseña Cambiada Exitosamente" });
                setCurrentPassword('');
                setNewPassword('');
                setRepeatPassword('');
                onHide(); // Cierra el modal
            } catch (error) {
                AlertError({ message: error.message });
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Cambiar Contraseña</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Contraseña Actual</Form.Label>
                        <Form.Control
                            type="password"
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nueva Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Repetir Nueva Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            value={repeatPassword}
                            onChange={e => setRepeatPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Cerrar</Button>
                    <Button variant="primary" type="submit">Guardar Cambios</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CambiaContra;
