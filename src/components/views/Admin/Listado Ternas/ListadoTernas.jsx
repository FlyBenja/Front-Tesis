import React, { useState, useEffect } from 'react';
import ModalConfirmacion from '../../../Modals/Fuentes/ModalConfirmacion';
import AlertError from '../../../Modals/Fuentes/AlertError';
import { getProfile } from '../../../Service/Apis-Admin/PerfilUsuario';
import { getGroupsTernas } from '../../../Service/Apis-Admin/GroupsTernas';
import { getInfoGroupTerna } from '../../../Service/Apis-Admin/InfoGrupTernas';

const ListadoTernas = () => {
    const [ternas, setTernas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTerna, setSelectedTerna] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    AlertError({ message: 'No se encontró el token. Por favor, inicia sesión.' });
                    return;
                }
                const profileData = await getProfile(token);
                if (profileData && profileData.sede) {
                    setUserData(profileData);
                    const currentYear = new Date().getFullYear();
                    const groupsTernas = await getGroupsTernas(profileData.sede, currentYear);
                    console.log('Grupos de Ternas:', groupsTernas);

                    const ternaDetailsPromises = groupsTernas.map(terna => getInfoGroupTerna(terna.groupTerna_id));
                    const ternaDetailsResults = await Promise.all(ternaDetailsPromises);

                    const detailedTernas = ternaDetailsResults.map(details => {
                        if (details.length > 0) {
                            const sortedRoles = {
                                presidente: details[0].users.find(user => user.rolTerna_id === 1)?.name || 'No asignado',
                                secretario: details[0].users.find(user => user.rolTerna_id === 2)?.name || 'No asignado',
                                vocal: details[0].users.find(user => user.rolTerna_id === 3)?.name || 'No asignado',
                            };
                            return { ...groupsTernas[details[0].groupTerna_id - 1], ...sortedRoles };
                        } else {
                            return { ...groupsTernas[details.groupTerna_id - 1], presidente: 'No asignado', secretario: 'No asignado', vocal: 'No asignado' };
                        }
                    });

                    setTernas(detailedTernas);
                    console.log('Detalles de todas las Ternas:', detailedTernas);
                }
            } catch (error) {
                console.error('Error en la cadena de llamadas a la API:', error);
                AlertError({ message: 'Error al recuperar los datos.' });
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (ternaId) => {
        // Lógica para eliminar la terna
    };

    const confirmEliminarTerna = (terna) => {
        setSelectedTerna(terna);
        setShowModal(true);
    };

    return (
        <div className="container my-4">
            <h2 className="mb-4">Listado de Ternas Creadas</h2>
            <div className="row">
                {ternas.map((terna) => (
                    <div key={terna.groupTerna_id} className="col-md-4 mb-4">
                        <div className="card shadow h-100 text-center">
                            <div className="card-header bg-primary text-white">
                                <h4>Terna {terna.groupTerna_id}</h4>
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
                                        onClick={() => confirmEliminarTerna(terna)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedTerna && (
                <ModalConfirmacion
                    isOpen={showModal}
                    onConfirm={() => handleDelete(selectedTerna.groupTerna_id)}
                    onCancel={() => setShowModal(false)}
                    nombre={`Terna ${selectedTerna.groupTerna_id}`}
                    pagina="Terna"
                />
            )}
        </div>
    );
};

export default ListadoTernas;
