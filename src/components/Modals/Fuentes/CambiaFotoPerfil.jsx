import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AlertSuccess from './AlertSuccess'; // Importa el componente de alerta de éxito
import AlertError from './AlertError'; // Asegúrate de tener este componente para manejar errores
import { updateProfilePhoto } from '../../Service/General/ActualizaFotoPerfil'; // Importa la función para actualizar la foto

const CambiaFotoPerfil = ({ show, onHide, onImageUpdate }) => {
    const [file, setFile] = useState(null);
    const [tempImage, setTempImage] = useState(null);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempImage(reader.result); // Establece la imagen seleccionada temporalmente
            };
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile); // Guarda el archivo para enviar
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                await updateProfilePhoto(file);
                AlertSuccess({ message: "Foto de perfil actualizada exitosamente" });
                onImageUpdate(); // Llama a la función de actualización
                onHide(); // Cierra el modal
            } catch (error) {
                AlertError({ message: error.message }); // Maneja errores en la actualización
            }
        }
    };

    // Efecto para limpiar el estado cada vez que se abre el modal
    useEffect(() => {
        if (show) {
            setFile(null);
            setTempImage(null); // Limpia la vista previa de la imagen
        }
    }, [show]);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Seleccione su nueva foto de perfil</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Subir nueva foto</Form.Label>
                        <Form.Control 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            value="" // Este valor se asegura de que el input file esté limpio
                        />
                        {tempImage && (
                            <div className="image-preview mt-3">
                                <img src={tempImage} alt="Vista previa" style={{ width: '100%' }} />
                            </div>
                        )}
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

export default CambiaFotoPerfil;
