import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import '../../layout/Admin/AsignarAlumAdmin.css';

const AsignarAlumAdmin = () => {
  const [alumnos, setAlumnos] = useState([
    { id: 1, nombre: 'Josue Benjamin Aldana Ramos' },
    { id: 2, nombre: 'Oscar David Alvarez Martinez' },
    { id: 3, nombre: 'Bryan Yeremy Arrazola Cisneros' },
    { id: 4, nombre: 'Cristian Paul Borja Martinez' },
    { id: 5, nombre: 'Carolay Estephania Cante De Leon' },
    { id: 6, nombre: 'Dulce María Carías Bran' },
    { id: 7, nombre: 'Kevin Leonel Carranza Marroquin' },
    { id: 8, nombre: 'Mynor Estuardo Junior Ceron Gaitan' },
    { id: 9, nombre: 'Elisa Noemí Dardón Salguero' },
    { id: 10, nombre: 'Carmen Mireya De La Cruz Barrientos' }
  ]);

  const [ternas, setTernas] = useState(['Terna1', 'Terna2', 'Terna3', 'Terna4', 'Terna5']);
  const [ruletaIndex, setRuletaIndex] = useState(0);
  const [alumnoAsignado, setAlumnoAsignado] = useState(null);

  const spinRuleta = () => {
    const interval = setInterval(() => {
      setRuletaIndex((prevIndex) => (prevIndex + 1) % ternas.length);
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
    }, 3000); // Gira por 3 segundos
  };

  const onDragStart = (e, alumno) => {
    e.dataTransfer.setData("alumnoId", alumno.id);
  };

  const onDrop = (e) => {
    const alumnoId = e.dataTransfer.getData("alumnoId");
    const alumno = alumnos.find((al) => al.id === parseInt(alumnoId));

    if (alumno && !alumnoAsignado) {
      setAlumnoAsignado(alumno);
      setAlumnos(prevState => prevState.filter(al => al.id !== parseInt(alumnoId)));
    }
  };

  const quitarAlumno = () => {
    if (alumnoAsignado) {
      setAlumnos(prevState => [...prevState, alumnoAsignado]);
      setAlumnoAsignado(null);
    }
  };

  return (
    <div id="asignarAlumAdminComponent" className="container-fluid asignar-alum-admin-container">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white" style={{ textAlign: 'center' }}>
              <h3>Alumnos</h3>
            </div>
            <ul className="list-group list-group-flush alumnos-list">
              {alumnos.map((alumno) => (
                <li
                  key={alumno.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  draggable
                  onDragStart={(e) => onDragStart(e, alumno)}
                >
                  {alumno.nombre}
                  <span className="badge bg-secondary">Arrastrar</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow mb-4">
                <div className="card-header bg-success text-white text-center">
                  <h4>Ruleta de Ternas</h4>
                </div>
                <div className="card-body text-center">
                  <div className="ruleta-container">
                    <div className="ruleta-display bg-light p-4 rounded-circle">
                      <h3>{ternas[ruletaIndex]}</h3>
                    </div>
                  </div>
                  <button className="btn btn-primary mt-4" onClick={spinRuleta}>
                    Girar Ruleta
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow mb-4">
                <div className="card-header bg-info text-white text-center">
                  <h4>Alumno a Asignar</h4>
                </div>
                <div
                  className="card-body dropzone text-center"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                >
                  {alumnoAsignado ? (
                    <div className="alumno-cuadro d-flex justify-content-between align-items-center mb-2 p-2 bg-light border rounded">
                      <span>{alumnoAsignado.nombre}</span>
                      <button className="btn btn-danger btn-sm" onClick={quitarAlumno}>Quitar</button>
                    </div>
                  ) : (
                    <p className="text-center text-muted">Arrastra un alumno aquí</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsignarAlumAdmin;
