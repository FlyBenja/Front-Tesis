import Swal from 'sweetalert2';
import '../Estilos/AlertSuccess.css';

const AlertSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "El archivo ha sido subido exitosamente",
    showConfirmButton: false,
    timer: 1500,
  });
};

export default AlertSuccess;
