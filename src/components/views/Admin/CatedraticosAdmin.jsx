import React, { useState } from 'react';
import '../../layout/Admin/CatedraticosAdmin.css';
import ModalConfirmacion from '../../Modals/Fuentes/ModalConfirmacion';
import AgregaCatedra from '../../Modals/Fuentes/Agregacatedra';  // Importamos el modal

const CatedraticosAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [catedraticos, setCatedraticos] = useState([
    { id: 1, nombre: 'Josue Benjamin Aldana Ramos', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 2, nombre: 'Oscar David Alvarez Martinez', img: 'https://via.placeholder.com/50', habilitado: false },
    // Más catedráticos...
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showAgregaModal, setShowAgregaModal] = useState(false);  // Estado para mostrar el modal de agregar catedrático
  const [selectedCatedratico, setSelectedCatedratico] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const confirmEliminarCatedratico = (id) => {
    const catedratico = catedraticos.find((cat) => cat.id === id);
    setSelectedCatedratico(catedratico); 
    setShowModal(true); 
  };

  const eliminarCatedratico = () => {
    const updatedCatedraticos = catedraticos.filter(
      (catedratico) => catedratico.id !== selectedCatedratico.id
    );
    setCatedraticos(updatedCatedraticos);
    setShowModal(false); 
  };

  const handleAgregarCatedratico = (nuevoCatedratico) => {
    setCatedraticos([...catedraticos, { id: catedraticos.length + 1, ...nuevoCatedratico }]);
    setShowAgregaModal(false);  
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

      <div className="catedraticos-list-container">
        <div className="catedraticos-list">
          {filteredCatedraticos.map((catedratico) => (
            <div key={catedratico.id} className="catedratico-item">
              <img src={catedratico.img} alt="Avatar" className="avatar" />
              <p>{catedratico.nombre}</p>
              <div className="actions">
                <button
                  className="toggle-btn"
                  onClick={() => confirmEliminarCatedratico(catedratico.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="btn-agregar-catedratico">
        <button className="btn btn-primary agregar-btn" onClick={() => setShowAgregaModal(true)}>
          Agregar Catedrático
        </button>
      </div>

      {/* Modal de confirmación */}
      {selectedCatedratico && (
        <ModalConfirmacion
          isOpen={showModal}
          onConfirm={eliminarCatedratico}
          onCancel={() => setShowModal(false)}
          nombre={selectedCatedratico.nombre}  
          pagina="Catedráticos"  
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
