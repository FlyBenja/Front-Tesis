import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/SidebarAdmin';
import '../layout/Admin/AsignacionesAdmin.css';

const AsignacionesAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      setSelectedFile(file);
    } else {
      alert('Por favor, selecciona un archivo Excel (.xlsx).');
    }
  };

  return (
    <div className={`wrapper ${showSidebar ? '' : 'sidebar-collapsed'} mt-0 AsignacionesAdmin`}>
      <Sidebar showSidebar={showSidebar} />
      <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
      
      <div className="admin-content d-flex flex-column align-items-center">
        <h2>Asignaciones</h2>

        {/* Filtros para seleccionar curso y tipo */}
        <div className="filters-container">
          <select className="form-select form-select-curso">
            <option>Cursos</option>
            <option>Curso 1</option>
            <option>Curso 2</option>
          </select>
          <select className="form-select form-select-estudiante">
            <option>Area</option>
            <option>Estudiantes</option>
            <option>Catedratico</option>
          </select>
        </div>

        {/* Área de subida de archivos */}
        <div className="upload-section">
          <input
            type="file"
            id="file-upload-input"
            accept=".xlsx, .xls"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div className="upload-area" onClick={() => document.getElementById('file-upload-input').click()}>
            Click to upload image
          </div>
          {selectedFile && <p className="file-info">Archivo seleccionado: {selectedFile.name}</p>}
          <button className="confirm-button">Confirmar Subida</button>
        </div>
      </div>
    </div>
  );
};

export default AsignacionesAdmin;
