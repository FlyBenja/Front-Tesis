import React, { useState } from 'react';
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
        },
        {
            id: 4,
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
        <div className="container my-4">
            <h2 className="mb-4">Listado de Ternas Creadas</h2>
            <div className="row">
                {ternas.map((terna) => (
                    <div key={terna.id} className="col-md-4 mb-4">
                        <div className="card shadow h-100 text-center">
                            <div className="card-header bg-primary text-white">
                                <h4>Terna {terna.id}</h4>
                            </div>
                            <div className="card-body d-flex flex-column justify-content-center">
                                <ul className="list-group list-group-flush mb-3">
                                    <li className="list-group-item">
                                        <strong>Presidente:</strong> 
                                        <p>{terna.presidente}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Secretario:</strong> 
                                        <p>{terna.secretario}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Vocal:</strong> 
                                        <p>{terna.vocal}</p>
                                    </li>
                                </ul>
                                <div className="mt-auto">
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => confirmEliminarTerna(terna)} // Abrir el modal al hacer clic
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
