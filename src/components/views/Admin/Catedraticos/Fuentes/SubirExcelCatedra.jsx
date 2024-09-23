import { useState } from "react";
import AlertSuccess from '../../../../Modals/Fuentes/AlertSuccess';  // Importar AlertSuccess
import AlertError from '../../../../Modals/Fuentes/AlertError';
import '../Estilos/SubirExcelCatedra.css';  // Importar el estilo global para catedráticos

const SubirExcelCatedra = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRol] = useState("2"); // Rol fijo para catedráticos

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
    if (!selectedFile) {
      AlertError({ message: "Por favor, selecciona un archivo para subir." });
      return;
    }

    // Aquí iría la lógica para manejar la subida del archivo
    AlertSuccess({ message: "Catedráticos subidos exitosamente!" });
    setSelectedFile(null);  // Limpia el archivo seleccionado tras una carga exitosa
  };

  return (
    <div className="SubirExcelCatedra">
      <h2 className="title">Subir Catedráticos</h2>
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

export default SubirExcelCatedra;
