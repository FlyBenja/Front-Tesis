import { useState } from 'react';
import Swal from 'sweetalert2';  // Importa SweetAlert2
import '../layout/Admin/SubirExcel.css';

const SubirExcel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [area, setArea] = useState(''); // Estado para el seleccionador de área

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setPreviewUrl(null);  // No mostrar vista previa para archivos Excel
        setSelectedFile(file);
      } else {
        // Mostrar alerta de error si no es un archivo Excel
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor, selecciona un archivo en formato Excel (.xls, .xlsx)!",
          confirmButtonText: "De acuerdo", // Cambia el texto del botón
          footer: '', // Elimina el pie de página
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    } else {
      //alert('Por favor, selecciona un archivo válido.');
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No has seleccionado ningún archivo!",
        confirmButtonText: "De acuerdo", // Cambia el texto del botón
        footer: '', // Elimina el pie de página
      });
      return;
    }

    // Aquí iría la lógica de subir el archivo
    // Suponiendo que todo sale bien:
    Swal.fire({
      position: "center", // Cambia la posición a "center"
      icon: "success",
      title: "El archivo ha sido subido exitosamente",
      showConfirmButton: false,
      timer: 1500
    });

    // Limpiar la selección de archivo después de la subida
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="subir-excel-page">
      <div className="asignaciones-admin">
        <h2 className="title">Seleccione Excel a Subir</h2>
        <div className="filters-container">
          {/* Condicional para mostrar el seleccionador de cursos a la izquierda solo si el área seleccionada es "Estudiantes" */}
          {area === 'estudiantes' && (
            <select className="form-select form-select-curso">
              <option>Cursos</option>
              <option>Curso 1</option>
              <option>Curso 2</option>
            </select>
          )}

          {/* Manejamos la selección del área, colocándolo a la derecha */}
          <select 
            className="form-select form-select-estudiante" 
            value={area} 
            onChange={(e) => setArea(e.target.value)}
            style={{ marginLeft: 'auto' }} // Empuja el selector de área hacia la derecha
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
            accept=".xlsx, .xls"  // Solo acepta archivos Excel
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
