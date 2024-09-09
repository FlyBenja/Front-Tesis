import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/Admin/AsignarTernasAdmin.css';

const AsignarTernasAdmin = () => {
  const [catedraticos, setCatedraticos] = useState([
    { id: 1, nombre: 'Carlos Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Jorge Martínez' },
    { id: 4, nombre: 'Ana Fernández' },
    { id: 5, nombre: 'Luis Rodríguez' },
    { id: 6, nombre: 'Sofía Gómez' },
    { id: 7, nombre: 'Pablo Hernández' },
    { id: 8, nombre: 'Claudia López' },
    { id: 9, nombre: 'Miguel Jiménez' },
    { id: 10, nombre: 'Patricia Torres' }
  ]);

  const [ternas, setTernas] = useState([
    { id: 1, nombre: 'Terna 1', catedraticos: [] },
    { id: 2, nombre: 'Terna 2', catedraticos: [] },
    { id: 3, nombre: 'Terna 3', catedraticos: [] },
  ]);

  const onDragStart = (e, catedratico) => {
    e.dataTransfer.setData("catedraticoId", catedratico.id);
  };

  const onDrop = (e, ternaId, dropIndex) => {
    const catedraticoId = e.dataTransfer.getData("catedraticoId");
    const catedratico = catedraticos.find((cat) => cat.id === parseInt(catedraticoId));

    if (catedratico) {
      setTernas(prevState =>
        prevState.map(terna => {
          if (terna.id === ternaId && terna.catedraticos.length < 3) {
            const updatedCatedraticos = [...terna.catedraticos];
            updatedCatedraticos.splice(dropIndex, 0, catedratico);
            return { ...terna, catedraticos: updatedCatedraticos };
          }
          return terna;
        })
      );

      setCatedraticos(prevState => prevState.filter(cat => cat.id !== parseInt(catedraticoId)));
    }
  };

  const quitarCatedratico = (ternaId, catedraticoId) => {
    const catedratico = ternas.find(terna => terna.id === ternaId).catedraticos.find(cat => cat.id === catedraticoId);

    if (catedratico) {
      setTernas(prevState =>
        prevState.map(terna => {
          if (terna.id === ternaId) {
            return { ...terna, catedraticos: terna.catedraticos.filter(cat => cat.id !== catedraticoId) };
          }
          return terna;
        })
      );

      setCatedraticos(prevState => [...prevState, catedratico]);
    }
  };

  const getDropText = (terna) => {
    const count = terna.catedraticos.length;
    if (count === 0) return "Arrastre Catedrático";
    if (count === 1) return "Arrastre Admin";
    if (count === 2) return "Arrastre num3";
    return "";
  };

  return (
    <div id="asignarTernasAdminComponent" className="container-fluid asignar-ternas-container">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white" style={{ textAlign: "center" }}>
              <h3>Catedráticos Disponibles</h3>
            </div>
            <ul className="list-group list-group-flush catedraticos-list">
              {catedraticos.map(catedratico => (
                <li
                  key={catedratico.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, catedratico)}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {catedratico.nombre}
                  <span className="badge bg-secondary">Arrastrar</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-8">
          <div className="row">
            {ternas.map(terna => (
              <div key={terna.id} className="col-md-4">
                <div className="card shadow mb-4">
                  <div className="card-header bg-success text-white text-center">
                    <h4>{terna.nombre}</h4>
                  </div>
                  <div
                    className="card-body dropzone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop(e, terna.id, terna.catedraticos.length)}
                  >
                    {terna.catedraticos.length === 0 ? (
                      <p className="text-center text-muted"></p>
                    ) : (
                      terna.catedraticos.map((catedratico, index) => (
                        <div key={catedratico.id} className="catedratico-cuadro d-flex justify-content-between align-items-center mb-2 p-2 bg-light border rounded">
                          <span>{catedratico.nombre}</span>
                          <button className="btn btn-danger btn-sm" onClick={() => quitarCatedratico(terna.id, catedratico.id)}>Quitar</button>
                        </div>
                      ))
                    )}
                    <p className="text-center text-muted">{getDropText(terna)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsignarTernasAdmin;
