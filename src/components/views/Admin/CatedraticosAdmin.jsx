import { useState } from 'react';
import '../../layout/Admin/CatedraticosAdmin.css';
import ModalConfirmacion from '../../Modals/Fuentes/ModalConfirmacion';



const CatedraticosAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [catedraticos, setCatedraticos] = useState([
    { id: 1, nombre: 'Josue Benjamin Aldana Ramos', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 2, nombre: 'Oscar David Alvarez Martinez', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 3, nombre: 'Bryan Yeremy Arrazola Cisneros', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 4, nombre: 'Cristian Paul Borja Martinez', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 5, nombre: 'Carolay Estephania Cante De Leon', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 6, nombre: 'Dulce María Carías Bran', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 7, nombre: 'Kevin Leonel Carranza Marroquin', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 8, nombre: 'Mynor Estuardo Junnior Ceron Gaitan', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 9, nombre: 'Elisa Noemí Dardón Salguero', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 10, nombre: 'Carmen Mireya De La Cruz Barrientos', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 11, nombre: 'Huver Roberto Donis Cordova', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 12, nombre: 'Maria Isabel Estrada López', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 13, nombre: 'Luis Fernando Fuentes Orellana', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 14, nombre: 'Andrea Michelle García Herrera', img: 'https://via.placeholder.com/50', habilitado: false },
    { id: 15, nombre: 'Julio César Hernández Álvarez', img: 'https://via.placeholder.com/50', habilitado: false },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showAgregaModal, setShowAgregaModal] = useState(false);  // Estado para mostrar el modal de agregar catedrático
  const [selectedCatedratico, setSelectedCatedratico] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleCatedratico = (id) => {
    const updatedCatedraticos = catedraticos.map((catedratico) =>
      catedratico.id === id
        ? { ...catedratico, habilitado: !catedratico.habilitado }
        : catedratico
    );
    setCatedraticos(updatedCatedraticos);
  };

  const confirmEliminarCatedratico = (id) => {
    const catedratico = catedraticos.find((cat) => cat.id === id);
    setSelectedCatedratico(catedratico); // Guardar el catedrático seleccionado
    setShowModal(true); // Mostrar modal de confirmación
  };

  const eliminarCatedratico = () => {
    const updatedCatedraticos = catedraticos.filter(
      (catedratico) => catedratico.id !== selectedCatedratico.id
    );
    setCatedraticos(updatedCatedraticos);
    setShowModal(false); // Cerrar el modal después de eliminar
  };

  const handleAgregarCatedratico = (nuevoCatedratico) => {
    setCatedraticos([...catedraticos, { id: catedraticos.length + 1, ...nuevoCatedratico }]);
    setShowAgregaModal(false);  // Cerrar el modal de agregar catedrático después de guardar
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
                  className={`toggle-btn ${catedratico.habilitado ? 'on' : 'off'}`}
                  onClick={() => toggleCatedratico(catedratico.id)}
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
          nombre={selectedCatedratico.nombre}  // Nombre del catedrático seleccionado
          pagina="Administración de Catedráticos"  // Página donde estás
        />
      )}

      {/* Modal para agregar catedrático */}

    </div>
  );
};

export default CatedraticosAdmin;
