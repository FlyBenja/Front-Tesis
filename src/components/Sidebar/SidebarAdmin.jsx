import PropTypes from "prop-types";
import "./SidebarAdmin.css";
import { PiStudentBold } from "react-icons/pi";
import { FaHome, FaChalkboardTeacher } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosSchool } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/imgs/logo3.png";

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  // Función para cerrar el sidebar en pantallas pequeñas
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  return (
    <div className={`sidebar ${showSidebar ? "active" : ""}`}>
      <div className="sidebar-logo">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <ul>
        <Link className="link-sidebar" to="/admin" onClick={handleLinkClick}>
          <li>
            <FaHome size={30} />
            <p>Inicio</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/estudiantes" onClick={handleLinkClick}>
          <li>
            <PiStudentBold size={30} />
            <p>Estudiantes</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/catedraticos" onClick={handleLinkClick}>
          <li>
            <FaChalkboardTeacher size={30} />
            <p>Catedráticos</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/tareas" onClick={handleLinkClick}>
          <li>
            <BsListTask size={30} />
            <p>Tareas</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/asignarternas" onClick={handleLinkClick}>
          <li>
            <IoPersonAddSharp size={30} />
            <p>Asignar Ternas</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/asignaralumos" onClick={handleLinkClick}>
          <li>
            <IoPersonAddSharp size={30} />
            <p>Asignar Alumnos</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/profile" onClick={handleLinkClick}>
          <li>
            <CgProfile size={30} />
            <p>Perfil</p>
          </li>
        </Link>
      </ul>
      <Link className="link-sidebar" to="/" onClick={handleLinkClick}>
        <button className="logout-btn">
          <BiLogOut size={30} />
          <p className="mb-0 p-2">Cerrar Sesión</p>
        </button>
      </Link>
    </div>
  );
};

Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
