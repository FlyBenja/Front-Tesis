import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/Admin/AsignacionesAdmin.css';

const AsignarAlumnos = () => {
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
    { id: 10, nombre: 'Carmen Mireya De La Cruz Barrientos' },
    { id: 11, nombre: 'Huver Roberto Donis Cordova' },
    { id: 12, nombre: 'Maria Isabel Estrada López' },
    { id: 13, nombre: 'Luis Fernando Fuentes Orellana' },
    { id: 14, nombre: 'Andrea Michelle García Herrera' },
    { id: 15, nombre: 'Julio César Hernández Álvarez' },
    { id: 16, nombre: 'Lucas Alejandro González' },
    { id: 17, nombre: 'Sofía Valentina Morales' },
    { id: 18, nombre: 'Samuel Mateo Pérez' },
    { id: 19, nombre: 'Valeria Camila Mendoza' },
    { id: 20, nombre: 'Gabriel Sebastián Ortiz' },
    { id: 21, nombre: 'Isabella Victoria Gómez' },
    { id: 22, nombre: 'Daniela Luna Martínez' },
    { id: 23, nombre: 'Emiliano Javier Torres' },
    { id: 24, nombre: 'Renata Lucía Herrera' },
    { id: 25, nombre: 'Martín Damián Castro' }
  ]);

  const [catedraticos, setCatedraticos] = useState([
    { id: 1, nombre: 'Catedrático 1', alumnos: [] },
    { id: 2, nombre: 'Catedrático 2', alumnos: [] },
    { id: 3, nombre: 'Catedrático 3', alumnos: [] },
  ]);

  const onDragStart = (e, alumno) => {
    e.dataTransfer.setData("alumnoId", alumno.id);
  };

  const onDrop = (e, catedraticoId, dropIndex) => {
    const alumnoId = e.dataTransfer.getData("alumnoId");
    const alumno = alumnos.find((al) => al.id === parseInt(alumnoId));

    if (alumno) {
      setCatedraticos(prevState =>
        prevState.map(cat => {
          if (cat.id === catedraticoId) {
            const updatedAlumnos = [...cat.alumnos];
            updatedAlumnos.splice(dropIndex, 0, alumno);
            return { ...cat, alumnos: updatedAlumnos };
          }
          return cat;
        })
      );

      setAlumnos(prevState => prevState.filter(al => al.id !== parseInt(alumnoId)));
    }
  };

  const quitarAlumno = (catedraticoId, alumnoId) => {
    const alumno = catedraticos.find(cat => cat.id === catedraticoId).alumnos.find(al => al.id === alumnoId);

    if (alumno) {
      setCatedraticos(prevState =>
        prevState.map(cat => {
          if (cat.id === catedraticoId) {
            return { ...cat, alumnos: cat.alumnos.filter(al => al.id !== alumnoId) };
          }
          return cat;
        })
      );

      setAlumnos(prevState => [...prevState, alumno]);
    }
  };

  return (
    <div className="container-fluid asignar-alumnos-container">
      <div className="row">
        {/* Alumnos list */}
        <div className="col-md-4">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
              <h3>Alumnos</h3>
            </div>
            <ul className="list-group list-group-flush alumnos-list">
              {alumnos.map(alumno => (
                <li
                  key={alumno.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, alumno)}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {alumno.nombre}
                  <span className="badge bg-secondary">Arrastrar</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Catedraticos columns */}
        <div className="col-md-8">
          <div className="row">
            {catedraticos.map(catedratico => (
              <div key={catedratico.id} className="col-md-4">
                <div className="card shadow mb-4">
                  <div className="card-header bg-success text-white text-center">
                    <h4>{catedratico.nombre}</h4>
                  </div>
                  <div
                    className="card-body dropzone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop(e, catedratico.id, catedratico.alumnos.length)}
                  >
                    {catedratico.alumnos.length === 0 ? (
                      <p className="text-center text-muted"></p>
                    ) : (
                      catedratico.alumnos.map((alumno, index) => (
                        <div key={alumno.id} className="alumno-cuadro d-flex justify-content-between align-items-center mb-2 p-2 bg-light border rounded">
                          <span>{alumno.nombre}</span>
                          <button className="btn btn-danger btn-sm" onClick={() => quitarAlumno(catedratico.id, alumno.id)}>Quitar</button>
                        </div>
                      ))
                    )}
                    <p className="text-center text-muted">Arrastra alumnos aquí</p>
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

export default AsignarAlumnos;
