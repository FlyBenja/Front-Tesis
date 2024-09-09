import Swal from 'sweetalert2';
import '../Estilos/AlertError.css';

const AlertError = ({ message }) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    confirmButtonText: "De acuerdo",
    footer: '',
  });
};

export default AlertError;
