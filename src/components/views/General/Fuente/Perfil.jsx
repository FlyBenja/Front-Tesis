import React, { useState, useEffect } from 'react';
import { getProfile } from '../../../Service/Apis-Admin/PerfilUsuario'; // Servicio para obtener el perfil
import ListSedes from '../../../Service/Apis-Admin/ListSedes'; // Servicio para obtener la lista de sedes
import CambiaContra from '../../../Modals/Fuentes/CambiaContra';
import CambiaFotoPerfil from '../../../Modals/Fuentes/CambiaFotoPerfil';
import '../Estilos/Perfil.css';

const Perfil = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
  const [userInfo, setUserInfo] = useState({
    userName: '',
    email: '',
    carnet: '',
    sede: null,
    roleName: ''
  });
  const [sedeName, setSedeName] = useState('');

  const handleImageModal = () => setShowImageModal(!showImageModal);
  const handlePasswordModal = () => setShowPasswordModal(!showPasswordModal);
  const handleSaveImage = (newImage) => setProfileImage(newImage);

  const fetchProfileData = async () => {
    try {
      const data = await getProfile();
      setUserInfo({
        userName: data.userName || '',
        email: data.email || '',
        carnet: data.carnet || '',
        sede: data.sede || null,
        roleName: data.roleName || ''
      });
      setProfileImage(data.profilePhoto || "https://via.placeholder.com/150");
    } catch (error) {
      console.error('Error al obtener la información del perfil:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (userInfo.sede) {
      const fetchSedeName = async () => {
        const sedes = await ListSedes();
        const sede = sedes.find(s => s.sede_id === userInfo.sede);
        setSedeName(sede ? sede.nameSede : 'Sede no encontrada');
      };

      fetchSedeName();
    }
  }, [userInfo.sede]);

  return (
    <div className="Perfil">
      <div className="container">
        <h2 className="text-start mt-4">Mi Perfil</h2>
      </div>
      <div className="d-flex justify-content-center align-items-center py-4">
        <div className="card shadow-sm text-center" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-body">
            <div className="position-relative mx-auto mb-3 imageContainer">
              <img src={profileImage} alt="Perfil" className="img-fluid" />
              <div className="position-absolute bottom-0 end-0 bg-dark text-white rounded-circle p-2 editIcon" onClick={handleImageModal}>
                <i className="fas fa-pencil-alt"></i>
              </div>
            </div>
            <div className="mb-3">
              <p className="mb-1">{sedeName}</p>
              <p className="mb-1">{userInfo.carnet}</p>
              <p className="mb-1">{userInfo.email}</p>
              <p className="mb-1">{userInfo.userName}</p>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-around mt-3 gx-5">
              <button className="btn btn-secondary mb-2 mb-md-0 w-100 w-md-auto" disabled>{userInfo.roleName}</button>
              <button className="btn btn-primary w-100 w-md-auto" onClick={handlePasswordModal}>Cambiar contraseña</button>
            </div>
          </div>
        </div>
      </div>

      <CambiaFotoPerfil show={showImageModal} onHide={handleImageModal} onImageUpdate={fetchProfileData} />
      <CambiaContra show={showPasswordModal} onHide={handlePasswordModal} />
    </div>
  );
};

export default Perfil;
