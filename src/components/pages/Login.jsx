import "admin-lte/dist/css/adminlte.min.css";
import "../layout/Admin/Login.css";
import loginLogo from "../../assets/imgs/login.svg";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-image">
          <img
            src={loginLogo}
            alt="Login Logo"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="card">
          <div
            className="card-body login-card-body"
            style={{ height: "600px" }}
          >
            <div className="login-logo">
              <a>
                <b>Iniciar</b> SESIÓN
              </a>
            </div>
            <p className="login-box-msg">
              Ingresa tus datos para iniciar sesión
            </p>
            <form>
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
                onClick={handleSubmit}
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
