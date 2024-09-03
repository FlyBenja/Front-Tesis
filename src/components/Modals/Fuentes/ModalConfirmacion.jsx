import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import '../Estilos/ModalConfirmacion.css';

const ModalConfirmacion = ({ isOpen, onConfirm, onCancel, nombre, pagina }) => {
  useEffect(() => {
    if (isOpen) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: `¿Estás seguro de eliminar la ${pagina.toLowerCase()} "${nombre}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, Confirmar!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirm();
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: `La ${pagina.toLowerCase()} "${nombre}" ha sido eliminada.`,
            icon: "success",
            confirmButtonText: "De Acuerdo"
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          onCancel();
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: `La ${pagina.toLowerCase()} "${nombre}" está a salvo.`,
            icon: "error",
            confirmButtonText: "De Acuerdo"
          });
        }
      });
    }
  }, [isOpen, onConfirm, onCancel, nombre, pagina]);

  return null;
};

ModalConfirmacion.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  nombre: PropTypes.string.isRequired,
  pagina: PropTypes.string.isRequired,
};

export default ModalConfirmacion;
