import { useState } from "react";
import AlertSuccess from '../../../../Modals/Fuentes/AlertSuccess';
import AlertError from '../../../../Modals/Fuentes/AlertError';
import '../Estilos/subirExcelAlumnos.css';  // Importar el estilo global para alumnos

const SubirExcelAlumnos = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCurso, setSelectedCurso] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      setSelectedFile(file);
    } else {
      AlertError({ message: "Por favor, selecciona un archivo en formato Excel (.xls, .xlsx)!" });
      setSelectedFile(null);
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile || !selectedCurso) {
      AlertError({ message: "Por favor, asegúrate de haber seleccionado todos los campos requeridos y un archivo." });
      return;
    }

    // Aquí iría la lógica para manejar la subida del archivo
    AlertSuccess({ message: "Estudiantes subidos exitosamente!" });
    setSelectedFile(null);  // Limpia el archivo seleccionado tras una carga exitosa
    setSelectedCurso("");   // Limpia el curso seleccionado
  };

  return (
    <div className="SubirExcelAlum">
      <h2 className="title">Subir Estudiantes</h2>
      <div className="filtersContainer">
        <select className="formSelect" value={selectedCurso} onChange={(e) => setSelectedCurso(e.target.value)}>
          <option value="">Seleccione un curso</option>
          {/* Opciones de cursos */}
        </select>
      </div>
      <div className="uploadSection">
        <input type="file" id="file-upload-input" accept=".xlsx, .xls" style={{ display: "none" }} onChange={handleFileChange} />
        <div className="uploadArea" onClick={() => document.getElementById("file-upload-input").click()}>
          {selectedFile ? <p className="fileInfo">Archivo seleccionado: {selectedFile.name}</p> : "Haz clic para subir un archivo Excel"}
        </div>
        <button className="confirmButton" onClick={handleFileUpload}>Confirmar Subida</button>
      </div>
    </div>
  );
};

export default SubirExcelAlumnos;
