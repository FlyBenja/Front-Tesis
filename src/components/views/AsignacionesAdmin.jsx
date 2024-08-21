import { useState } from 'react';
import '../layout/Admin/AsignacionesAdmin.css';

const AsignacionesAdmin = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      setSelectedFile(file);
    } else {
      alert('Por favor, selecciona un archivo Excel (.xlsx).');
    }
  };

  return (
    <div className="asignaciones-admin d-flex flex-column align-items-center">
      <h2>Asignaciones</h2>
      <div className="filters-container">
        <select className="form-select form-select-curso">
          <option>Cursos</option>
          <option>Curso 1</option>
          <option>Curso 2</option>
        </select>
        <select className="form-select form-select-estudiante">
          <option>Área</option>
          <option>Estudiantes</option>
          <option>Catedrático</option>
        </select>
      </div>
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
  );
};

export default AsignacionesAdmin;
