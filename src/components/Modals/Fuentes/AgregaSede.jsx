import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Estilos/AgregaSede.css'; // Importa el archivo CSS específico para este modal

const AgregaSede = ({ isOpen, accion, onSave, onCancel }) => {
  const [nombreSede, setNombreSede] = useState('');

  const handleSave = () => {
    // Lógica de guardado
    onSave({ nombreSede });
  };

  if (!isOpen) return null;

  return (
    <div className="agrega-sede-modal-overlay">
      <div className="agrega-sede-modal-container">
        <h2>{accion === 1 ? 'Agregar Sede' : 'Editar Sede'}</h2>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Nombre de la Sede"
            value={nombreSede}
            onChange={(e) => setNombreSede(e.target.value)}
            className="form-control mb-3"
          />
        </div>
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={handleSave}>
            {accion === 1 ? 'Guardar' : 'Guardar Cambios'}
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

AgregaSede.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  accion: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AgregaSede;
