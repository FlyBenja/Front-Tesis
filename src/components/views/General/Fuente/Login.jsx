import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../Estilos/Login.css";
import loginLogo from "../../../../assets/imgs/login.svg";
import umgLogo from "../../../../assets/imgs/logo3.png";
import ofiLogo from "../../../../assets/imgs/sistemas1_11zon.webp";
import { login } from '../../../Service/Apis-Admin/LoginForm'; // Importa el servicio de autenticación
import AlertError from '../../../Modals/Fuentes/AlertError';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    try {
      const data = await login(email, password);
      if (data && data.token) {
        navigate("/admin");
      } else {
        AlertError({ message: "Error de Datos" });
      }
    } catch (error) {
      AlertError({ message: error.message });
    }
  };

  return (
    <div className="login-page-container d-flex align-items-center justify-content-center vh-100" style={{ backgroundImage: `url(${ofiLogo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="login-box d-flex flex-column flex-md-row w-100" style={{ maxWidth: '1200px', height: '600px', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px' }}>
        <div className="login-image d-none d-md-flex align-items-center justify-content-center w-50" style={{ backgroundColor: 'rgba(0, 46, 91, 0.5)' }}>
          <img src={loginLogo} alt="Login Logo" className="img-fluid" />
        </div>
        <div className="login-card-body bg-white p-4 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', width: '100%', maxWidth: '350px', margin: 'auto' }}>
          <div className="login-logo text-center mb-4">
            <h2 className="mb-3">Gestor de tesis</h2>
            <img src={umgLogo} alt="UMG Logo" className="mb-3" style={{ width: '150px' }} />
            <h3>Inicio de Sesión</h3>
          </div>
          <form onSubmit={handleSubmit} className="w-100">
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Correo" />
              <div className="input-group-append">
                <span className="input-group-text bg-transparent border-0">
                  <FaEnvelope className="fs-5" />
                </span>
              </div>
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control" placeholder="Contraseña" />
              <div className="input-group-append">
                <span className="input-group-text bg-transparent border-0">
                  <FaLock className="fs-5" />
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block w-100">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
