import { useState } from 'react';
import AlertSuccess from '../../../Modals/Fuentes/AlertSuccess';
import AlertError from '../../../Modals/Fuentes/AlertError';
import '../Estilos/subirExcel.css';

const SubirExcel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [area, setArea] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setPreviewUrl(null);
        setSelectedFile(file);
      } else {
        AlertError({ message: "Por favor, selecciona un archivo en formato Excel (.xls, .xlsx)!" });
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      AlertError({ message: "No has seleccionado ningún archivo!" });
      return;
    }

    AlertSuccess();

    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div id="subirExcelComponent" className="subir-excel-page">
      <div className="asignaciones-admin">
        <h2 className="title">Seleccione Excel a Subir</h2>
        <div className="filters-container">
          {area === 'estudiantes' && (
            <select className="form-select form-select-curso">
              <option>Cursos</option>
              <option>Curso 1</option>
              <option>Curso 2</option>
            </select>
          )}
          <select 
            className="form-select form-select-estudiante" 
            value={area} 
            onChange={(e) => setArea(e.target.value)}
            style={{ marginLeft: 'auto' }}
          >
            <option value="">Área</option>
            <option value="estudiantes">Estudiantes</option>
            <option value="catedratico">Catedrático</option>
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
            {previewUrl ? (
              <img src={previewUrl} alt="Vista previa" className="preview-image" />
            ) : (
              'Haz clic para subir un archivo Excel'
            )}
          </div>
          {selectedFile && (
            <p className="file-info">
              Archivo seleccionado: {selectedFile.name}
            </p>
          )}
          <button className="confirm-button" onClick={handleFileUpload}>
            Confirmar Subida
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubirExcel;
