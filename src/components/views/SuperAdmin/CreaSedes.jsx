import React, { useState } from 'react';
import '../../layout/Admin/CreaSedes.css';
import AgregaSede from '../../Modals/Fuentes/AgregaSede';
import ModalConfirmacion from '../../Modals/Fuentes/ModalConfirmacion';

const CreaSedes = () => {
  const [sede, setSede] = useState('');
  const [sedes, setSedes] = useState([
    { id: 1, nombre: 'Guastatoya' },
    { id: 2, nombre: 'Sanarate' }
  ]);
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para manejar el valor de búsqueda

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(1);
  const [selectedSede, setSelectedSede] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCrearSede = () => {
    setModalAction(1); // Acción 1 para crear sede
    setShowModal(true); // Mostrar el modal
  };

  const handleEditarSede = (sede) => {
    setSelectedSede(sede);
    setModalAction(2); // Acción 2 para editar sede
    setShowModal(true); // Mostrar el modal
  };

  const handleEliminarSede = (id) => {
    const sede = sedes.find((s) => s.id === id);
    setSelectedSede(sede);
    setShowConfirmModal(true); // Mostrar el modal de confirmación
  };

  const eliminarSede = () => {
    const nuevasSedes = sedes.filter(sede => sede.id !== selectedSede.id);
    setSedes(nuevasSedes);
    setShowConfirmModal(false); // Cerrar el modal después de eliminar
  };

  // Filtrar las sedes según el término de búsqueda
  const filteredSedes = sedes.filter((sede) =>
    sede.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="crea-sedes-container">
      <div className="header">
        <h2>Sedes</h2>
        <button onClick={handleCrearSede} className="crea-sedes-btn">Crear</button>
      </div>
      <div className="crea-sedes-input-container">
        <label htmlFor="sede">Sede:</label>
        <input
          type="text"
          id="sede"
          value={searchTerm} // Cambiado para usar searchTerm
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el valor de búsqueda
          className="crea-sedes-input"
          placeholder="Buscar sede..." // Añadir un placeholder
        />
      </div>

      <table className="crea-sedes-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSedes.map((sede) => ( // Usar las sedes filtradas
            <tr key={sede.id}>
              <td>{sede.id}</td>
              <td>{sede.nombre}</td>
              <td>
                <button className="btn btn-success" onClick={() => handleEditarSede(sede)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleEliminarSede(sede.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar o editar sede */}
      <AgregaSede
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        accion={modalAction}
      />

      {/* Modal de confirmación para eliminar */}
      {selectedSede && (
        <ModalConfirmacion
          isOpen={showConfirmModal}
          onConfirm={eliminarSede}
          onCancel={() => setShowConfirmModal(false)}
          nombre={selectedSede.nombre}
          pagina="Sede"
        />
      )}
    </div>
  );
};

export default CreaSedes;
