import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AlertSuccess from './AlertSuccess'; // Importa el componente de alerta de éxito

const CambiaFotoPerfil = ({ show, onHide, onSaveImage }) => {
    const [tempImage, setTempImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempImage(reader.result); // Establece la imagen seleccionada temporalmente
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tempImage) {
            onSaveImage(tempImage); // Llama a la función que se pasa desde `Perfil`
            AlertSuccess({ message: "Foto de perfil cambiada" }); // Muestra la alerta de éxito
            onHide(); // Cierra el modal
        }
    };

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
