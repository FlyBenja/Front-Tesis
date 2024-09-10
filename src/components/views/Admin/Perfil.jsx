import React, { useState } from 'react';
import CambiaContra from '../../Modals/Fuentes/CambiaContra';
import CambiaFotoPerfil from '../../Modals/Fuentes/CambiaFotoPerfil'; // Importa CambiaFotoPerfil
import '../../layout/Admin/Perfil.css';

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
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-image-container">
          <img src={profileImage} alt="Perfil" className="perfil-image" />
          <div className="edit-icon" onClick={handleImageModal}>
            <i className="fas fa-pencil-alt"></i> {/* Icono de edición */}
          </div>
        </div>
        <div className="perfil-info">
          <p>Guastatoya</p>
          <p>1890-23-2109</p>
          <p>diego.santos@gmail.com</p>
          <p>Diego Santos</p>
        </div>
        <div className="perfil-actions">
          <button className="perfil-role">Administrador</button>
          <button className="perfil-change-password" onClick={handlePasswordModal}>Cambiar contraseña</button>
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
