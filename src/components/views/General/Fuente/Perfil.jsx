import React, { useState } from 'react';
import CambiaContra from '../../../Modals/Fuentes/CambiaContra'; // Importa CambiaContra
import CambiaFotoPerfil from '../../../Modals/Fuentes/CambiaFotoPerfil'; // Importa CambiaFotoPerfil
import '../Estilos/Perfil.css';

const Perfil = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150"); // Imagen por defecto

  const handleImageModal = () => setShowImageModal(!showImageModal);
  const handlePasswordModal = () => setShowPasswordModal(!showPasswordModal);

  const handleSaveImage = (newImage) => {
    setProfileImage(newImage); // Actualiza la imagen de perfil con la nueva imagen
  };

  return (
    <div className="Perfil">
      <div className="container">
        <h2 className="text-start">Mi Perfil</h2> {/* Agrega el título aquí */}
      </div>
      <div className="d-flex justify-content-center align-items-center py-4">
        <div className="card shadow-sm text-center" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-body">
            <div className="position-relative mx-auto mb-3 imageContainer">
              <img src={profileImage} alt="Perfil" className="rounded-circle img-fluid" />
              <div className="position-absolute bottom-0 end-0 bg-dark text-white rounded-circle p-2 editIcon" onClick={handleImageModal}>
                <i className="fas fa-pencil-alt"></i>
              </div>
            </div>
            <div className="mb-3">
              <p className="mb-1">Guastatoya</p>
              <p className="mb-1">1890-23-2109</p>
              <p className="mb-1">diego.santos@gmail.com</p>
              <p className="mb-1">Diego Santos</p>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-around mt-3 gx-5">
              <button className="btn btn-secondary mb-2 mb-md-0 w-100 w-md-auto" disabled>Administrador</button>
              <button className="btn btn-primary w-100 w-md-auto" onClick={handlePasswordModal}>Cambiar contraseña</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para cambiar imagen de perfil */}
      <CambiaFotoPerfil show={showImageModal} onHide={handleImageModal} onSaveImage={handleSaveImage} />

      {/* Modal para cambiar contraseña */}
      <CambiaContra show={showPasswordModal} onHide={handlePasswordModal} />
    </div>
  );
};

export default Perfil;
