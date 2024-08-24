import "admin-lte/dist/css/adminlte.min.css";
import "../layout/Admin/Login.css";
import loginLogo from "../../assets/imgs/login.svg"; // Imagen del muñeco
import umgLogo from "../../assets/imgs/logo3.png"; // Logo de la UMG
import ofiLogo from "/src/assets/imgs/sistemas1_11zon.jpg";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <div 
      className="login-page-container hold-transition login-page" 
      style={{ backgroundImage: `url(${ofiLogo})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}
    >
      <div className="login-box">
        <div className="login-image">
          <img
            src={loginLogo}
            alt="Login Logo"
          />
        </div>
        <div className="login-card-body">
          <div className="login-logo">
            <h2>Gestor de tesis</h2> {/* Texto superior */}
            <img src={umgLogo} alt="UMG Logo" style={{ width: '150px', margin: '20px 0' }} /> {/* Logo UMG */}
            <h3>Inicio de Sesión</h3> {/* Texto inferior */}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <FaEnvelope />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <FaLock />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block w-100"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
