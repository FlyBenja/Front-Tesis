import React, { useState } from 'react';
import '../../layout/Admin/Perfil.css';

const Perfil = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150"); // Imagen por defecto
  const [tempImage, setTempImage] = useState(null); // Imagen seleccionada temporalmente

  const handleImageModal = () => setShowImageModal(!showImageModal);
  const handlePasswordModal = () => setShowPasswordModal(!showPasswordModal);

  // Manejar cambio de archivo
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result); // Establece la imagen seleccionada temporalmente
      };
      reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
  };

  // Guardar cambios de imagen de perfil
  const handleSaveImage = () => {
    if (tempImage) {
      setProfileImage(tempImage); // Actualiza la imagen de perfil con la seleccionada
    }
    setShowImageModal(false); // Cierra el modal
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-image-container">
          <img
            src={profileImage}
            alt="Perfil"
            className="perfil-image"
          />
          <div className="edit-icon" onClick={handleImageModal}>
            <i className="fas fa-pencil-alt"></i> {/* Icono de edición */}
          </div>
        </div>
        <div className="perfil-info">
          <p>Guastatoya</p>
          <p>1890-23-2109</p>
          <p>diego.santos@gmail.com</p>
          <p>Diego Santos sadhaksjd kasjdhad</p>
        </div>
        <div className="perfil-actions">
          <button className="perfil-role">Administrador</button>
          <button className="perfil-change-password" onClick={handlePasswordModal}>Cambiar contraseña</button>
        </div>
      </div>

      {/* Modal para cambiar imagen de perfil */}
      <div className={`modal ${showImageModal ? 'd-block' : 'd-none'}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Seleccione su nueva foto de perfil</h5>
              <button type="button" className="btn-close" onClick={handleImageModal}></button>
            </div>
            <div className="modal-body">
              <input 
                type="file" 
                accept="image/*" 
                className="form-control" 
                onChange={handleImageChange} 
              />
              {tempImage && (
                <div className="image-preview">
                  <img src={tempImage} alt="Vista previa" className="perfil-image" />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleImageModal}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveImage}>Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para cambiar contraseña */}
      <div className={`modal ${showPasswordModal ? 'd-block' : 'd-none'}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cambiar Contraseña</h5>
              <button type="button" className="btn-close" onClick={handlePasswordModal}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Contraseña Actual</label>
                <input type="password" className="form-control" id="currentPassword" />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">Contraseña Nueva</label>
                <input type="password" className="form-control" id="newPassword" />
              </div>
              <div className="mb-3">
                <label htmlFor="repeatPassword" className="form-label">Repetir Contraseña</label>
                <input type="password" className="form-control" id="repeatPassword" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handlePasswordModal}>Cerrar</button>
              <button type="button" className="btn btn-primary">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
