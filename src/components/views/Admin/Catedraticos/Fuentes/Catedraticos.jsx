import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/Catedraticos.css';
import ModalConfirmacion from '../../../../Modals/Fuentes/ModalConfirmacion';
import AgregaCatedra from '../../../../Modals/Fuentes/Agregacatedra';
import { getProfile } from '../../../../Service/Apis-Admin/PerfilUsuario';
import { TodosCatedraticos } from '../../../../Service/Apis-Admin/TodosCatedraticos';
import { toggleCatedraticoStatus } from '../../../../Service/Apis-Admin/StatusCatedratico';
import { eliminarCatedratico } from '../../../../Service/Apis-Admin/EliminarCatedratico';
import AlertError from '../../../../Modals/Fuentes/AlertError';

const CatedraticosAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [catedraticos, setCatedraticos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAgregaModal, setShowAgregaModal] = useState(false);
  const [selectedCatedratico, setSelectedCatedratico] = useState(null);
  const [sedeId, setSedeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserProfile = async () => {
      try {
        const userProfile = await getProfile(token);
        setSedeId(userProfile.sede);
        fetchCatedraticos(userProfile.sede);
      } catch (error) {
        AlertError({ message: 'Error al obtener el perfil del usuario' });
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };

    const fetchCatedraticos = async (sede_id) => {
      try {
        const catedraticosData = await TodosCatedraticos(sede_id);
        setCatedraticos(
          catedraticosData.map((catedratico) => ({
            id: catedratico.user_id,
            nombre: catedratico.userName,
            img: catedratico.profilePhoto || null,
            habilitado: catedratico.activoTerna,
          }))
        );
      } catch (error) {
        AlertError({ message: 'Error al obtener los catedráticos' });
        console.error('Error al obtener los catedráticos:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleCatedratico = async (id, habilitadoActual) => {
    try {
      const data = await toggleCatedraticoStatus(id, habilitadoActual);
      const updatedCatedraticos = catedraticos.map((catedratico) =>
        catedratico.id === id ? { ...catedratico, habilitado: data.data.activoTerna } : catedratico
      );
      setCatedraticos(updatedCatedraticos);
    } catch (error) {
      AlertError({ message: 'Error al cambiar el estado del catedrático' });
      console.error('Error al cambiar el estado del catedrático:', error);
    }
  };

  const confirmEliminarCatedratico = (id) => {
    const catedratico = catedraticos.find((cat) => cat.id === id);
    setSelectedCatedratico(catedratico);
    setShowModal(true);
  };

  const handleEliminarCatedratico = async () => {
    try {
      await eliminarCatedratico(selectedCatedratico.id);
      const updatedCatedraticos = catedraticos.filter(
        (catedratico) => catedratico.id !== selectedCatedratico.id
      );
      setCatedraticos(updatedCatedraticos);
      setShowModal(false);
    } catch (error) {
      AlertError({ message: 'Error al eliminar el catedrático' });
      console.error('Error al eliminar el catedrático:', error);
    }
  };

  const handleAgregarCatedratico = (nuevoCatedratico) => {
    setCatedraticos([...catedraticos, { id: catedraticos.length + 1, ...nuevoCatedratico }]);
    setShowAgregaModal(false);
  };

  const getInitial = (nombre) => {
    return nombre ? nombre.charAt(0).toUpperCase() : ""; // Retorna la primera letra del nombre en mayúscula
  };

  const filteredCatedraticos = catedraticos.filter((catedratico) =>
    catedratico.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catedraticos-admin-container">
      <h2>Administración de Catedráticos</h2>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Buscar Catedrático"
        value={searchTerm}
        onChange={handleSearch}
      />

      {catedraticos.length === 0 ? (
        <div className="no-catedraticos-container">
          <h4>No existen catedráticos subidos</h4>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate('/admin/SubirExcelCatedratico')}
          >
            Subir Catedráticos
          </button>
        </div>
      ) : (
        <>
          <div className="catedraticos-list-container">
            <div className="catedraticos-list">
              {filteredCatedraticos.map((catedratico) => (
                <div key={catedratico.id} className="catedratico-item">
                  {catedratico.img ? (
                    <img src={catedratico.img} alt="Avatar" className="avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      {getInitial(catedratico.nombre)}
                    </div>
                  )}
                  <p>{catedratico.nombre}</p>
                  <div className="actions">
                    <button
                      className={`toggle-btn ${catedratico.habilitado ? 'on' : 'off'}`}
                      onClick={() => toggleCatedratico(catedratico.id, catedratico.habilitado)}
                    >
                      {catedratico.habilitado ? 'ON' : 'OFF'}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => confirmEliminarCatedratico(catedratico.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="btn-agregar-catedratico d-flex m-0 justify-content-around">
            <button
              className="btn btn-primary agregar-btn m-0"
              onClick={() => setShowAgregaModal(true)}
            >
              Agregar Catedrático
            </button>
            <button
              className="btn btn-primary agregar-btn m-0"
              onClick={() => navigate('/admin/SubirExcelCatedratico')}
            >
              Subir Catedrático
            </button>
          </div>
        </>
      )}

      {/* Modal de confirmación */}
      {selectedCatedratico && (
        <ModalConfirmacion
          isOpen={showModal}
          onConfirm={handleEliminarCatedratico}
          onCancel={() => setShowModal(false)}
          nombre={selectedCatedratico.nombre}
          pagina="Catedrátic@"
        />
      )}

      {/* Modal para agregar catedrático */}
      <AgregaCatedra
        isOpen={showAgregaModal}
        onSave={handleAgregarCatedratico}
        onCancel={() => setShowAgregaModal(false)}
      />
    </div>
  );
};

export default CatedraticosAdmin;
