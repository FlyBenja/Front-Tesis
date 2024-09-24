import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "admin-lte/dist/css/adminlte.min.css";
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
    <div className="login-page-container hold-transition login-page" style={{ backgroundImage: `url(${ofiLogo})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <div className="login-box">
        <div className="login-image">
          <img src={loginLogo} alt="Login Logo"/>
        </div>
        <div className="login-card-body">
          <div className="login-logo">
            <h2>Gestor de tesis</h2>
            <img src={umgLogo} alt="UMG Logo" style={{ width: '150px', margin: '20px 0' }}/>
            <h3>Inicio de Sesión</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Correo"/>
              <div className="input-group-append">
                <div className="input-group-text">
                  <FaEnvelope />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control" placeholder="Contraseña"/>
              <div className="input-group-append">
                <div className="input-group-text">
                  <FaLock />
                </div>
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
