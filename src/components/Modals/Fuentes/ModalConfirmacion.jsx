import React from 'react';
import PropTypes from 'prop-types';
import '../Estilos/ModalConfirmacion.css';

const ModalConfirmacion = ({ isOpen, onConfirm, onCancel, nombre, pagina }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>¿Estás seguro?</h2>
        <p>¿Estás seguro de eliminar la {pagina.toLowerCase()} <strong>{nombre}</strong>?</p>
        <div className="modal-buttons">
          <button className="btn btn-success" onClick={onConfirm}>Confirmar</button>
          <button className="btn btn-danger" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

ModalConfirmacion.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  nombre: PropTypes.string.isRequired,
  pagina: PropTypes.string.isRequired,
};

export default ModalConfirmacion;
