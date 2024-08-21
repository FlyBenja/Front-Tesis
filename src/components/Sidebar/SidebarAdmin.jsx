import PropTypes from "prop-types";
import "./SidebarAdmin.css";
import { PiStudentBold } from "react-icons/pi";
import { FaHome, FaChalkboardTeacher } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import {  IoPersonAddSharp } from "react-icons/io5";
import { IoIosSchool } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/imgs/logo3.png";

const Sidebar = ({ showSidebar }) => {
  return (
    <div className={`sidebar ${showSidebar ? "active" : ""}`}>
      <div className="sidebar-logo">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <ul>
        <Link className="link-sidebar" to="/admin">
          <li>
            <FaHome size={30} />
            <p>Inicio</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/estudiantes">
          <li>
            <PiStudentBold size={30} />
            <p>Estudiantes</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/catedraticos">
          <li>
            <FaChalkboardTeacher size={30} />
            <p>Catedráticos</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/tareas">
          <li>
            <BsListTask size={30} />
            <p>Tareas</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/asignaciones">
          <li>
            <IoPersonAddSharp size={30} />
            <p>Asignaciones</p>
          </li>
        </Link>
        <Link className="link-sidebar" to="/admin/sedes">
          <li>
            <IoIosSchool size={30} />
            <p>Sedes</p>
          </li>
        </Link> 
        <Link className="link-sidebar" to="/admin/profile">
          <li>
            <CgProfile size={30} />
            <p>Perfil</p>
          </li>
        </Link>
      </ul>
      <Link className="link-sidebar" to="/">
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
};

export default Sidebar;
