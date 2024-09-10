import Swal from 'sweetalert2';
import '../Estilos/AlertSuccess.css';

const AlertSuccess = ({ message }) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: message,  // Usa el parámetro de mensaje aquí
    showConfirmButton: false,
    timer: 20000,
  });
};

export default AlertSuccess;
