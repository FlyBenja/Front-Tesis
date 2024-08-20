import PropTypes from "prop-types";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
// import { FaUserAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa"; // Importa el ícono de cerrar

const Navbar = ({ toggleSidebar, showSidebar }) => {
  return (
    <nav className={`navbar ${showSidebar ? '' : 'navbar-active'} fixed-top` }>
      <button
        className={`hamburger ${showSidebar ? '' : 'active'} p-2`}
        onClick={toggleSidebar}
      >
        {showSidebar ? <FaTimes size={30} /> : <GiHamburgerMenu size={30} />} {/* Cambia el ícono */}
      </button>
      {/* <button className="btn btn-outline-primary p-1 m-2">
        <FaUserAlt size={30} />
      </button> */}
    </nav>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired,
};

export default Navbar;
