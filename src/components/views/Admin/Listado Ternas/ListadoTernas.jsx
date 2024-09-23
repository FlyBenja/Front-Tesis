import React, { useState } from 'react';
import './ListadoTernas.css';
import ModalConfirmacion from '../../../Modals/Fuentes/ModalConfirmacion'; // Asegúrate de importar el modal
import AlertError from '../../../Modals/Fuentes/AlertError'; // Importamos AlertError
import AlertSuccess from '../../../Modals/Fuentes/AlertSuccess'; // Importamos AlertSuccess

const ListadoTernas = () => {
    const initialTernas = [
        {
            id: 1,
            presidente: 'Carlos Pérez',
            secretario: 'María García',
            vocal: 'Jorge Martínez'
        },
        {
            id: 2,
            presidente: 'Ana Fernández',
            secretario: 'Luis Rodríguez',
            vocal: 'Sofía Gómez'
        },
        {
            id: 3,
            presidente: 'Pablo Hernández',
            secretario: 'Claudia López',
            vocal: 'Miguel Jiménez'
        }
    ];

    const [ternas, setTernas] = useState(initialTernas);
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const [selectedTerna, setSelectedTerna] = useState(null); // Estado para guardar la terna seleccionada

    const handleDelete = async (ternaId) => {
        try {
            // Simulamos la eliminación de la terna
            const filteredTernas = ternas.filter(terna => terna.id !== ternaId);
            setTernas(filteredTernas);
            setShowModal(false); // Cerrar el modal después de eliminar

            // Mostramos la alerta de éxito
            AlertSuccess({
                message: `La Terna ${ternaId} ha sido eliminada exitosamente.`
            });
        } catch (error) {
            // En caso de error, mostramos la alerta de error
            AlertError({
                message: `Ocurrió un error al eliminar la Terna ${ternaId}. Inténtalo de nuevo.`
            });
            setShowModal(false); // Cerrar el modal de todas formas
        }
    };

    const confirmEliminarTerna = (terna) => {
        setSelectedTerna(terna); // Guardar la terna seleccionada
        setShowModal(true); // Mostrar el modal de confirmación
    };

    return (
        <div className="list-ternas-admin-container">
            {ternas.map((terna) => (
                <div key={terna.id} className="card shadow mb-4 terna-card">
                    <div className="card-header bg-primary text-white">
                        <h4>Terna {terna.id}</h4>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <strong>Presidente: </strong> {terna.presidente}
                            </li>
                            <li className="list-group-item">
                                <strong>Secretario: </strong> {terna.secretario}
                            </li>
                            <li className="list-group-item">
                                <strong>Vocal: </strong> {terna.vocal}
                            </li>
                        </ul>
                        <div className="text-center mt-3">
                            <button 
                                className="btn btn-danger"
                                onClick={() => confirmEliminarTerna(terna)} // Abrir el modal al hacer clic
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal de confirmación */}
            {selectedTerna && (
                <ModalConfirmacion
                    isOpen={showModal}
                    onConfirm={() => handleDelete(selectedTerna.id)} // Confirmar eliminación
                    onCancel={() => setShowModal(false)} // Cancelar eliminación
                    nombre={`Terna ${selectedTerna.id}`}  // Mostrar el ID de la terna en el modal
                    pagina="Terna"
                />
            )}
        </div>
    );
};

export default ListadoTernas;
