import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/SidebarAdmin';
import AsignarTernasAdmin from '../views/Admin/AsignarTernasAdmin';
import AsignarAlumAdmin from '../views/Admin/AsignarAlumAdmin';
import BitacoraAdmin from '../views/Admin/BitacoraAdmin';
import CatedraticosAdmin from '../views/Admin/CatedraticosAdmin';
import EstudiantesAdmin from '../views/Admin/EstudiantesAdmin';
import SubirExcel from '../pages/SubirExcel'; 
import Perfil from '../views/Admin/Perfil';
import TareaGenAdmin from '../views/Admin/TareaGenAdmin';
import '../../index.css';

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`wrapper ${showSidebar ? '' : 'sidebar-collapsed'}`}>
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className={`content-wrapper ${showSidebar ? '' : 'content-active'}`}>
        <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        <div className={`admin-content ${showSidebar ? '' : 'active'}`}>
          <Routes>
            <Route path="/asignarternas" element={<AsignarTernasAdmin />} />
            <Route path="/asignaralumos" element={<AsignarAlumAdmin />} />
            <Route path="/" element={<BitacoraAdmin />} />
            <Route path="/catedraticos" element={<CatedraticosAdmin />} />
            <Route path="/estudiantes" element={<EstudiantesAdmin />} />
            <Route path="/SubirExcel" element={<SubirExcel />} /> 
            <Route path="/profile" element={<Perfil />} />
            <Route path="/tareas" element={<TareaGenAdmin />} />
            {/* Añade más rutas según sea necesario */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
