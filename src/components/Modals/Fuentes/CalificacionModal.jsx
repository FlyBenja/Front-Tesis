import React, { useState } from 'react';
import '../Estilos/CalificacionModal.css';  // Importamos el CSS para el modal

const CalificacionModal = ({ show, handleClose }) => {
  const [calificacion, setCalificacion] = useState('');

  const handleInputChange = (e) => {
    setCalificacion(e.target.value);
  };

  const handleCalificar = () => {
    // Aquí puedes manejar la lógica para guardar la calificación
    console.log("Calificación ingresada:", calificacion);
    handleClose();  // Cerrar el modal después de calificar
  };

  return (
    <div className={`modal ${show ? 'modal-show' : 'modal-hide'}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h5>Calificar Tarea</h5>
          <button className="close" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          <label htmlFor="calificacion-input">Ingrese punteo de la tarea:</label>
          <input
            type="number"
            id="calificacion-input"
            value={calificacion}
            onChange={handleInputChange}
            placeholder="Ej: 85"
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleCalificar}>Calificar</button>
          <button className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default CalificacionModal;
