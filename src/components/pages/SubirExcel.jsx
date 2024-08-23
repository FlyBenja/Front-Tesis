import { useState } from 'react';
import '../layout/Admin/SubirExcel.css';

const SubirExcel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
      setSelectedFile(file);
    } else {
      alert('Por favor, selecciona un archivo válido.');
    }
  };

  return (
    <div className="subir-excel-page">
      <div className="asignaciones-admin">
        <h2 className="title">Asignaciones</h2>
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
            accept=".xlsx, .xls, image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div className="upload-area" onClick={() => document.getElementById('file-upload-input').click()}>
            {previewUrl ? (
              <img src={previewUrl} alt="Vista previa" className="preview-image" />
            ) : (
              'Haz clic para subir un archivo Excel o una imagen'
            )}
          </div>
          {selectedFile && (
            <p className="file-info">
              Archivo seleccionado: {selectedFile.name}
            </p>
          )}
          <button className="confirm-button">Confirmar Subida</button>
        </div>
      </div>
    </div>
  );
};

export default SubirExcel;
