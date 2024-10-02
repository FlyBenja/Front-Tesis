import PropTypes from "prop-types";
import "./SidebarAdmin.css";
import { PiStudentBold } from "react-icons/pi";
import { FaHome, FaChalkboardTeacher } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import logo from "../../../assets/imgs/logo3.png";

const Sidebar = ({ showSidebar, toggleSidebar }) => {
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
        <NavLink
          to="/admin"
          className={({ isActive }) => isActive ? "link-sidebar active-link" : "link-sidebar"}
          onClick={handleLinkClick}
          end
        >
          <li>
            <FaHome size={30} />
            <p>Inicio</p>
          </li>
        </NavLink>
        <NavLink
          to="/admin/estudiantes"
          className={({ isActive }) => isActive ? "link-sidebar active-link" : "link-sidebar"}
          onClick={handleLinkClick}
          end
        >
          <li>
            <PiStudentBold size={30} />
            <p>Estudiantes</p>
          </li>
        </NavLink>
        <NavLink
          to="/admin/catedraticos"
          className={({ isActive }) => isActive ? "link-sidebar active-link" : "link-sidebar"}
          onClick={handleLinkClick}
          end
        >
          <li>
            <FaChalkboardTeacher size={30} />
            <p>Catedráticos</p>
          </li>
        </NavLink>
        <NavLink
          to="/admin/listadoternas"
          className={({ isActive }) => isActive ? "link-sidebar active-link" : "link-sidebar"}
          onClick={handleLinkClick}
          end
        >
          <li>
            <BsListTask size={30} />
            <p>Listado Ternas</p>
          </li>
        </NavLink>
        <NavLink
          to="/admin/tareas"
          className={({ isActive }) => isActive ? "link-sidebar active-link" : "link-sidebar"}
          onClick={handleLinkClick}
          end
        >
          <li>
            <BsListTask size={30} />
            <p>Crear Tareas</p>
          </li>
        </NavLink>
        <NavLink
          to="/admin/asignarternas"
          className={({ isActive }) => isActive ? "link-sidebar active-link" : "link-sidebar"}
          onClick={handleLinkClick}
          end
        >
          <li>
            <IoPersonAddSharp size={30} />
            <p>Crear Ternas</p>
          </li>
        </NavLink>
        <NavLink
          to="/admin/asignaralumos"
          className={({ isActive }) => isActive ? "link-sidebar active-link" : "link-sidebar"}
          onClick={handleLinkClick}
          end
        >
          <li>
            <IoPersonAddSharp size={30} />
            <p>Asignar Alumnos</p>
          </li>
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) => isActive ? "link-sidebar active-link" : "link-sidebar"}
          onClick={handleLinkClick}
          end
        >
          <li>
            <CgProfile size={30} />
            <p>Perfil</p>
          </li>
        </NavLink>
      </ul>
      <NavLink to="/" className={({ isActive }) => isActive ? "link-sidebar active-link" : "link-sidebar"} onClick={handleLinkClick}>
        <button className="logout-btn">
          <BiLogOut size={30} />
          <p className="mb-0 p-2">Cerrar Sesión</p>
        </button>
      </NavLink>
    </div>
  );
};

Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
