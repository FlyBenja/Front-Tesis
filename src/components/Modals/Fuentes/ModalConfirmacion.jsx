import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Estilos/ModalConfirmacion.css';

const ModalConfirmacion = ({ isOpen, onConfirm, onCancel, nombre }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">¿Estás seguro?</h2>
        <p className="modal-message">
          ¿Estás seguro de eliminar al catedrático?
        </p>
        <p className="modal-nombre"><strong>{nombre}</strong></p>
        <div className="modal-buttons">
          <button className="btn btn-success" onClick={onConfirm}>Confirmar</button>
          <button className="btn btn-danger" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
