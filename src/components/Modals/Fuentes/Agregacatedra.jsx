import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Estilos/AgregaCatedra.css'; // Asegúrate de tener los estilos encapsulados solo para este modal

const AgregaCatedra = ({ isOpen, onSave, onCancel }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSave = () => {
    // Lógica de guardado
    onSave({ nombre, correo });
  };

  if (!isOpen) return null;

  return (
    <div className="agrega-catedra-modal-overlay">
      <div className="agrega-catedra-modal-container">
        <h2>Agregar Catedrático</h2>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Nombre Completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="form-control mb-3"
          />
        </div>
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

AgregaCatedra.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AgregaCatedra;
