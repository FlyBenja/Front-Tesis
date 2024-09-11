import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import '../../layout/Admin/PropuestasAlum.css';

const PropuestasAlum = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, task } = location.state || { student: { nombre: 'Desconocido' }, task: { title: 'Tarea no especificada' } };

  const propuestas = [
    {
      id: 1, title: 'Implementación de un Sistema de Detección de Intrusos en Redes Utilizando Aprendizaje Automático',
      details: 'Este proyecto se centra en desarrollar un sistema capaz de detectar intrusiones en tiempo real mediante técnicas avanzadas de aprendizaje automático, aumentando la seguridad de las redes corporativas.'
    },
    {
      id: 2, title: 'Desarrollo de una Plataforma Web para la Gestión Inteligente de Recursos Energéticos en Hogares Conectados',
      details: 'La plataforma permitirá a los usuarios controlar y optimizar el uso de energía en sus hogares mediante el uso de IoT, proporcionando una interfaz amigable y datos en tiempo real sobre el consumo energético.'
    },
    {
      id: 3, title: 'Optimización del Rendimiento de Aplicaciones Web mediante el Uso de Algoritmos de Caché y Compresión de Datos',
      details: 'Este proyecto mejorará el rendimiento de las aplicaciones web mediante algoritmos avanzados de caché y compresión, reduciendo los tiempos de carga y mejorando la experiencia del usuario en plataformas de alta demanda.'
    }
  ];

  const [selectedId, setSelectedId] = useState(null);
  const [approvedId, setApprovedId] = useState(null);

  const toggleDetails = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const approvePropuesta = (id) => {
    setApprovedId(id);
  };

  return (
    <div className="propuestas-alum">
      <div className="card card-custom">
        <div className="card-header card-header-custom">
          <button className="btn btn-icon" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Regresar
          </button>
          <span>Listado de {task.title} de {student.nombre}</span>
        </div>

        <div className="card-header card-header-custom task-title">
          <span>Listado de {task.title}</span>
        </div>

        <div className="card-body card-body-custom">
          <ul className="list-group list-group-custom">
            {propuestas.map((propuesta) => (
              <div key={propuesta.id} style={{ marginBottom: '5px' }}>
                <li className={`list-group-item ${approvedId === propuesta.id ? 'approved' : ''}`}>
                  <div onClick={() => toggleDetails(propuesta.id)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    {propuesta.title}
                    {selectedId === propuesta.id ? <FaChevronDown /> : <FaChevronRight />}
                  </div>
                </li>

                {selectedId === propuesta.id && (
                  <div className={`details ${approvedId === propuesta.id ? 'approved-details' : ''}`}>
                    <h5>Detalle de propuesta {propuesta.id} </h5>
                    <p>{propuesta.details}</p>  
                    <button className="approve-btn" onClick={() => approvePropuesta(propuesta.id)}>Aprobar</button>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropuestasAlum;
