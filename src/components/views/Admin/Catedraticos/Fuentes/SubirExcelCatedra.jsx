import { useState, useEffect } from "react";
import AlertSuccess from '../../../../Modals/Fuentes/AlertSuccess';  // Importar AlertSuccess
import AlertError from '../../../../Modals/Fuentes/AlertError';
import { getProfile } from '../../../../Service/Apis-Admin/PerfilUsuario'; // Importar getProfile
import { CargaMasiva } from '../../../../Service/Apis-Admin/CargaMasiva'; // Importar el servicio para la carga masiva
import '../Estilos/SubirExcelCatedra.css';  // Importar el estilo global para catedráticos

const SubirExcelCatedra = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRol] = useState("2"); // Rol fijo para catedráticos
  const [userData, setUserData] = useState(null);

  // useEffect para obtener el perfil del usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        if (!token) {
          AlertError({ message: "Token no encontrado. Por favor, inicia sesión de nuevo." });
          return;
        }

        const profileData = await getProfile(token); // Pasa el token a la función de obtención de perfil
        setUserData(profileData);
      } catch (error) {
        AlertError({ message: `Error al obtener los datos: ${error.message}` });
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      setSelectedFile(file);
    } else {
      AlertError({ message: "Por favor, selecciona un archivo en formato Excel (.xls, .xlsx)!" });
      setSelectedFile(null);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !userData) {
      AlertError({ message: "Por favor, asegúrate de haber seleccionado todos los campos requeridos, un archivo y de estar autenticado." });
      return;
    }

    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    if (!token) {
      AlertError({ message: "Token no encontrado. Por favor, inicia sesión de nuevo." });
      return;
    }

    const formData = new FormData();
    formData.append("archivo", selectedFile);
    formData.append("sede_id", userData.sede);
    formData.append("rol_id", selectedRol);

    // Imprimir los datos del formData para depuración
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof Blob ? value.name : value}`);
    }

    try {
      const result = await CargaMasiva(formData, token);
      console.log('Respuesta del servidor:', result); // Imprimir la respuesta del servidor
      AlertSuccess({ message: "Catedráticos subidos exitosamente!" });
      setSelectedFile(null);  // Limpia el archivo seleccionado tras una carga exitosa
    } catch (error) {
      AlertError({ message: `Error en la subida: ${error.message}` });
    }
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
