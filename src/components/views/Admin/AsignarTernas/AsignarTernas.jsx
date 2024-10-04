import React, { useState, useEffect } from 'react';
import './AsignarTernas.css';
import AlertSuccess from '../../../Modals/Fuentes/AlertSuccess';
import AlertError from '../../../Modals/Fuentes/AlertError';
import { getActiveTernas } from '../../../Service/Apis-Admin/ListTernaActive';
import { getProfile } from '../../../Service/Apis-Admin/PerfilUsuario';
import { creaTernas } from '../../../Service/Apis-Admin/CreaTernas';

const AsignarTernas = () => {
    const [catedraticos, setCatedraticos] = useState([]);
    const [terna, setTerna] = useState({ id: 2, nombre: 'Crear Ternas', catedraticos: [] });
    const [isUploading, setIsUploading] = useState(false);
    const [sede, setSede] = useState(null);
    const [initialLoadEmpty, setInitialLoadEmpty] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchProfileAndTernas = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    AlertError({ message: 'No se encontró el token. Por favor, inicia sesión.' });
                    return;
                }
                const profileData = await getProfile(token);
                if (profileData && profileData.sede) {
                    setSede(profileData.sede);
                    const activeTernas = await getActiveTernas(profileData.sede, currentYear);
                    if (activeTernas && activeTernas.length > 0) {
                        const updatedCatedraticos = activeTernas.map(terna => ({
                            id: terna.user_id,
                            nombre: terna.userName,
                            typeTask_id: terna.typeTask_id
                        }));
                        setCatedraticos(updatedCatedraticos);
                        setInitialLoadEmpty(false);
                        setApiError(false);
                    } else {
                        setCatedraticos([]);
                        setInitialLoadEmpty(true);
                        setApiError(true);
                    }
                } else {
                    setApiError(true);
                    AlertError({ message: 'No se encontró la sede en los datos del perfil.' });
                }
            } catch (error) {
                console.error('Error al recuperar las ternas activas:', error);
                setApiError(true);
                AlertError({ message: "No se pudo recuperar los Catedráticos Activos" });
            }
        };

        fetchProfileAndTernas();
    }, [currentYear, refreshTrigger]);

    const onDragStart = (e, catedratico) => {
        e.dataTransfer.setData("catedraticoId", catedratico.id);
    };

    const onDrop = (e) => {
        const catedraticoId = e.dataTransfer.getData("catedraticoId");
        const catedratico = catedraticos.find(cat => cat.id === parseInt(catedraticoId));
        if (catedratico && terna.catedraticos.length < 3) {
            setTerna(prevTerna => ({
                ...prevTerna,
                catedraticos: [...prevTerna.catedraticos, catedratico]
            }));
            setCatedraticos(prevCatedraticos => prevCatedraticos.filter(cat => cat.id !== parseInt(catedraticoId)));
        }
    };

    const quitarCatedratico = (catedraticoId) => {
        const catedratico = terna.catedraticos.find(cat => cat.id === catedraticoId);
        if (catedratico) {
            setTerna(prevTerna => ({
                ...prevTerna,
                catedraticos: prevTerna.catedraticos.filter(cat => cat.id !== catedraticoId)
            }));
            setCatedraticos(prevCatedraticos => [...prevCatedraticos, catedratico]);
        }
    };

    const getDropText = () => {
        const roles = ["Arrastra Presidente", "Arrastra Tesorero", "Arrastra Vocal"];
        return roles[terna.catedraticos.length] || "";
    };

    const handleUploadTerna = async () => {
        if (terna.catedraticos.length === 3) {
            const token = localStorage.getItem('token');
            if (!token) {
                AlertError({ message: 'No se encontró el token de autenticación.' });
                return;
            }

            const ternaData = terna.catedraticos.map((catedratico, index) => ({
                user_id: catedratico.id,
                sede_id: sede,
                year: currentYear,
                rolTerna_id: index + 1  // 1: Presidente, 2: Secretario, 3: Vocal
            }));

            try {
                setIsUploading(true);
                await creaTernas(ternaData, token);
                setIsUploading(false);
                AlertSuccess({ message: "Ternas subidas exitosamente." });
                setTerna(prevTerna => ({ ...prevTerna, catedraticos: [] }));
                setCatedraticos(prevCatedraticos => [...prevCatedraticos, ...terna.catedraticos]);
                setRefreshTrigger(refreshTrigger + 1);  // Incrementa para refrescar la lista de catedráticos
            } catch (error) {
                console.error('Error al subir la terna:', error);
                AlertError({ message: "Error al subir la terna." });
                setIsUploading(false);
            }
        } else {
            AlertError({ message: "Complete las 3 posiciones para subir" });
        }
    };

    if (apiError) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh', textAlign: 'center' }}>
                <p className="fw-bold fs-4" style={{ color: '#333' }}>No hay Catedráticos Activos.</p>
                <p className="fw-bold fs-4" style={{ color: '#333' }}>Favor de Activar Catedráticos para utilizar la Página.</p>
            </div>
        );
    }

    return (
        <div className="asignar-ternas-admin">
            <div className="container pt-4">
                <div className="row">
                    <div className="col-12 mb-3">
                        <h3 className="text-left">Crear grupos Ternas</h3>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow mb-4">
                            <div className="card-header bg-primary text-white text-center">
                                <h3>Catedráticos Disponibles</h3>
                            </div>
                            <ul className="list-group list-group-flush" style={{ height: '375px', overflowY: 'auto' }}>
                                {catedraticos.map(catedratico => (
                                    <li
                                        key={catedratico.id}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, catedratico)}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        {catedratico.nombre}
                                        <span className="badge bg-secondary">Arrastrar</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card shadow mb-4">
                            <div className="card-header bg-success text-white text-center">
                                <h4>{terna.nombre}</h4>
                            </div>
                            <div
                                className="card-body"
                                style={{ minHeight: '150px', border: 'none', backgroundColor: '#f8f9fa', borderRadius: '5px' }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={onDrop}
                            >
                                {terna.catedraticos.map((catedratico, index) => (
                                    <div key={catedratico.id} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light border rounded">
                                        <span>{catedratico.nombre}</span>
                                        <button className="btn btn-danger btn-sm" onClick={() => quitarCatedratico(catedratico.id)}>Quitar</button>
                                    </div>
                                ))}
                                <p className="text-center text-muted">{getDropText()}</p>
                            </div>

                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={handleUploadTerna}
                                    disabled={isUploading || terna.catedraticos.length < 3}
                                >
                                    Subir Terna
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsignarTernas;
