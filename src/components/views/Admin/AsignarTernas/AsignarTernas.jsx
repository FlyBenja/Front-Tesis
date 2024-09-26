import React, { useState } from 'react';
import './AsignarTernas.css';
import AlertSuccess from '../../../Modals/Fuentes/AlertSuccess';  // Importamos AlertSuccess
import AlertError from '../../../Modals/Fuentes/AlertError';      // Importamos AlertError

const AsignarTernas = () => {
    const initialCatedraticos = [
        { id: 1, nombre: 'Carlos Pérez' },
        { id: 2, nombre: 'María García' },
        { id: 3, nombre: 'Jorge Martínez' },
        { id: 4, nombre: 'Ana Fernández' },
        { id: 5, nombre: 'Luis Rodríguez' },
        { id: 6, nombre: 'Sofía Gómez' },
        { id: 7, nombre: 'Pablo Hernández' },
        { id: 8, nombre: 'Claudia López' },
        { id: 9, nombre: 'Miguel Jiménez' },
        { id: 10, nombre: 'Patricia Torres' }
    ];

    const [catedraticos, setCatedraticos] = useState(initialCatedraticos);
    const [terna, setTerna] = useState({ id: 2, nombre: 'Crear Ternas', catedraticos: [] });
    const [isUploading, setIsUploading] = useState(false);  // Estado para controlar el bloqueo del botón

    const onDragStart = (e, catedratico) => {
        e.dataTransfer.setData("catedraticoId", catedratico.id);
    };

    const onDrop = (e) => {
        const catedraticoId = e.dataTransfer.getData("catedraticoId");
        const catedratico = catedraticos.find((cat) => cat.id === parseInt(catedraticoId));
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

    const handleUploadTerna = () => {
        if (terna.catedraticos.length === 3) {
            AlertSuccess({ message: "Ternas Subidos Exitosamente" });
            // Limpiar la terna actual y actualizar el estado de catedráticos disponibles
            setTerna(prevTerna => ({ ...prevTerna, catedraticos: [] }));
            setCatedraticos(prevCatedraticos => [
                ...prevCatedraticos,
                ...terna.catedraticos
            ]);
        } else {
            AlertError({ message: "Complete las 3 posiciones para subir" });
        }
    };


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
                            {/* Lista de catedráticos con altura fija y scroll */}
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
                                    disabled={isUploading || terna.catedraticos.length < 3}  // Bloquear el botón si está subiendo o si faltan catedráticos
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
