import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/SidebarAdmin';
import AsignacionesAdmin from '../views/AsignacionesAdmin';
import BitacoraAdmin from '../views/BitacoraAdmin';
import EstudiantesAdmin from '../views/EstudiantesAdmin';
import Perfil from '../views/Perfil';
import '../../index.css';
const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`wrapper ${showSidebar ? '' : 'sidebar-collapsed'}`}>
      <Sidebar showSidebar={showSidebar} />
      <div className={`content-wrapper ${showSidebar ? '' : 'content-active'}`}>
        <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        <div className={`admin-content ${showSidebar ? '' : 'active'}`}>
          <Routes>
            <Route path="/asignaciones" element={<AsignacionesAdmin />} />
            <Route path="/" element={<BitacoraAdmin />} />
            <Route path="/estudiantes" element={<EstudiantesAdmin />} />
            <Route path="/profile" element={<Perfil />} />
            {/* Añade más rutas según sea necesario */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
