import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../../Navbar/Navbar';
import Sidebar from '../../../Sidebar/Admin/SidebarAdmin';
import AsignarTernas from '../../../views/Admin/AsignarTernas/AsignarTernas';
import AsignarAlumno from '../../../views/Admin/Asignar Alumos/AsignarAlumno';
import Bitacora from '../../../views/Admin/Inicio/Bitacora';
import Catedraticos from '../../../views/Admin/Catedraticos/Fuentes/Catedraticos';
import Estudiantes from '../../../views/Admin/Estudiantes/Fuentes/Estudiantes';
import SubirExcelAlumnos from '../../../views/Admin/Estudiantes/Fuentes/SubirExcelAlumnos';
import SubirExcelCatedra from '../../../views/Admin/Catedraticos/Fuentes/SubirExcelCatedra';
import Perfil from '../../../views/General/Fuente/Perfil';
import GenerarTareas from '../../../views/Admin/Tareas/GenerarTareas';
import TareasAlumno from '../../../views/Admin/Estudiantes/Fuentes/TareasAlumno';
import TareaAlumIndiv from '../../../views/Admin/Estudiantes/Fuentes/TareaAlumnoIndiv';
import PropuestasAlum from '../../../views/Admin/Estudiantes/Fuentes/Propuestas';
import ListadoTernas  from '../../../views/Admin/Listado Ternas/ListadoTernas';
import '../../../../index.css';

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
            <Route path="/asignarternas" element={<AsignarTernas />} />
            <Route path="/asignaralumos" element={<AsignarAlumno />} />
            <Route path="/" element={<Bitacora />} />
            <Route path="/catedraticos" element={<Catedraticos />} />
            <Route path="/estudiantes" element={<Estudiantes />} />
            <Route path="/SubirExcelAlumnos" element={<SubirExcelAlumnos />} /> 
            <Route path="/SubirExcelCatedraticos" element={<SubirExcelCatedra />} /> 
            <Route path="/profile" element={<Perfil />} />
            <Route path="/tareas" element={<GenerarTareas />} />
            <Route path="/tarealum" element={<TareasAlumno />} />
            <Route path="/propuestatesis" element={<PropuestasAlum />} />
            <Route path="/tareaindivi" element={<TareaAlumIndiv />} />
            <Route path="/listadoternas" element={<ListadoTernas />} />
            {/* Añade más rutas según sea necesario */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
