import React, { useState } from 'react';
import '../../layout/Admin/ListTernasAdmin.css';

const ListTernasAdmin = () => {
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

    const handleDelete = (ternaId) => {
        const filteredTernas = ternas.filter(terna => terna.id !== ternaId);
        setTernas(filteredTernas);
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
                                onClick={() => handleDelete(terna.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListTernasAdmin;
