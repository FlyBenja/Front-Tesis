import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/SidebarAdmin';
import AsignacionesAdmin from '../views/Admin/AsignacionesAdmin';
import BitacoraAdmin from '../views/Admin/BitacoraAdmin';
import CatedraticosAdmin from '../views/Admin/CatedraticosAdmin';
import EstudiantesAdmin from '../views/Admin/EstudiantesAdmin';
import Perfil from '../views/Admin/Perfil';
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
            <Route path="/catedraticos" element={<CatedraticosAdmin />} />
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
