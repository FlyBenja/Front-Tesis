import React, { useState, useEffect } from 'react';
import './AsignarAlumno.css';
import AlertSuccess from '../../../Modals/Fuentes/AlertSuccess';  // Importamos AlertSuccess
import AlertError from '../../../Modals/Fuentes/AlertError';      // Importamos AlertError

const AsignarAlumno = () => {
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

  const [ternas, setTernas] = useState([
    { id: 1, nombre: 'Terna1' },
    { id: 2, nombre: 'Terna2' },
    { id: 3, nombre: 'Terna3' },
    { id: 4, nombre: 'Terna4' },
    { id: 5, nombre: 'Terna5' }
  ]);

  const [ternaAsignada, setTernaAsignada] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [alumnosResaltados, setAlumnosResaltados] = useState([]); // Almacena los alumnos resaltados en verde
  const [alumnosSeleccionados, setAlumnosSeleccionados] = useState([]); // Guardar los alumnos seleccionados (con id y nombre)
  const [vueltas, setVueltas] = useState(0); // Controlar el número de vueltas
  const [alumnoActualId, setAlumnoActualId] = useState(null); // Guardar el ID del alumno actual que se resalta en amarillo

  const onDragStart = (e, terna) => {
    e.dataTransfer.setData("ternaId", terna.id);
  };

  const onDrop = (e) => {
    const ternaId = e.dataTransfer.getData("ternaId");
    const terna = ternas.find((t) => t.id === parseInt(ternaId));

    if (terna && !ternaAsignada) {
      setTernaAsignada(terna);
      setTernas(prevTernas => prevTernas.filter(t => t.id !== parseInt(ternaId)));
    }
  };

  const quitarTerna = () => {
    if (ternaAsignada) {
      setTernas(prevTernas => [...prevTernas, ternaAsignada]);
      setTernaAsignada(null);
    }
  };

  // Función para eliminar a los alumnos seleccionados de la lista de alumnos
  const eliminarAlumnosSeleccionados = () => {
    setAlumnos(prevAlumnos => prevAlumnos.filter(alumno =>
      !alumnosSeleccionados.some(sel => sel.nombre === alumno.nombre)
    ));
  };

  // Función para seleccionar aleatoriamente 3 alumnos con id y nombre
  const seleccionarAlumnos = () => {
    const alumnosAleatorios = [];
    const totalAlumnos = alumnos.length;
    const indices = new Set();
    while (alumnosAleatorios.length < 3) {
      const randomIndex = Math.floor(Math.random() * totalAlumnos);
      if (!indices.has(randomIndex)) {
        indices.add(randomIndex);
        const alumnoSeleccionado = alumnos[randomIndex];
        alumnosAleatorios.push({
          id: alumnosAleatorios.length + 1, // Asignar ids 1, 2, 3 a los seleccionados
          nombre: alumnoSeleccionado.nombre
        });
      }
    }
    setAlumnosSeleccionados(alumnosAleatorios);
  };

  // Efecto que selecciona alumnos cuando el botón se presiona y comienza el ciclo de resaltado
  useEffect(() => {
    if (alumnosSeleccionados.length > 0) {
      console.log("Alumnos seleccionados:", alumnosSeleccionados);
      iniciarResaltado();
    }
  }, [alumnosSeleccionados]);

  const asignarTerna = () => {
    if (!ternaAsignada) {
      AlertError({
        message: "Seleccione una Terna para asignar"
      });
      return;
    }

    setIsButtonDisabled(true);
    seleccionarAlumnos(); // Escoge los alumnos antes de empezar
  };

  const iniciarResaltado = () => {
    let currentIndex = 0;
    let vueltasRealizadas = 0; // Controlar el número de vueltas realizadas
    const totalAlumnos = alumnos.length;

    const intervalId = setInterval(() => {
      const alumnoActual = alumnos[currentIndex];
      setAlumnoActualId(alumnoActual.id); // Resaltar en amarillo al alumno actual

      // Resaltar en verde dependiendo del número de vuelta y del id asignado
      const alumnoSeleccionado = alumnosSeleccionados.find(
        (al) => al.nombre === alumnoActual.nombre && al.id === vueltasRealizadas + 1
      );

      // Si los nombres coinciden y la vuelta corresponde al id, resaltar en verde
      if (alumnoSeleccionado) {
        setAlumnosResaltados((prev) => [...prev, alumnoActual]);
      }

      currentIndex++;

      if (currentIndex === totalAlumnos) {
        currentIndex = 0;
        vueltasRealizadas++; // Incrementar el número de vueltas realizadas

        // Detener el ciclo después de 3 vueltas
        if (vueltasRealizadas === 3) {
          clearInterval(intervalId);
          AlertSuccess({
            message: `La Terna ${ternaAsignada.nombre} ha sido asignada a los alumnos: ${alumnosSeleccionados.map(al => al.nombre).join(", ")}`,
          });
          setAlumnoActualId(null);
          setTernaAsignada(null);
          setIsButtonDisabled(false);
          eliminarAlumnosSeleccionados(); // Eliminar los alumnos seleccionados después de la alerta
        }
      }
    }, 500); // Cambia el tiempo entre cada resaltado
  };

  return (
    <div id="asignarAlumAdminComponent" className="AsignarAlumno container-fluid py-1">
      {/* Título */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="text-left mt-4">Asignar Alumno a Terna</h2>
        </div>
      </div>

      <div className="row">
        {/* Componente Ternas */}
        <div className="col-md-4">
          <div className="card shadow mb-4">
            <div className="card-header bg-success text-white text-center">
              <h3>Ternas</h3>
            </div>
            <ul className="list-group list-group-flush" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {ternas.map((terna) => (
                <li
                  key={terna.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  draggable
                  onDragStart={(e) => onDragStart(e, terna)}
                >
                  {terna.nombre}
                  <span className="badge bg-secondary">Arrastrar</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Componente Terna a Asignar */}
        <div className="col-md-4">
          <div className="card shadow mb-4">
            <div className="card-header bg-info text-white text-center">
              <h3>Terna a Asignar</h3>
            </div>
            <div
              className="card-body d-flex justify-content-center align-items-center text-center"
              style={{ minHeight: '100px', border: 'none', borderRadius: '5px' }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
            >
              {ternaAsignada ? (
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light border rounded w-100">
                  <span>{ternaAsignada.nombre}</span>
                  <button className="btn btn-danger btn-sm" onClick={quitarTerna}>Quitar</button>
                </div>
              ) : (
                <p className="text-muted">Arrastra una terna aquí</p>
              )}
            </div>
            <div className="text-center mt-3">
              <button
                className="btn btn-primary w-100"
                onClick={asignarTerna}
                disabled={isButtonDisabled || !ternaAsignada}
              >
                Asignar Terna
              </button>
            </div>
          </div>
        </div>

        {/* Componente Alumnos */}
        <div className="col-md-4">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white text-center">
              <h3>Alumnos</h3>
            </div>
            <ul className="list-group list-group-flush" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {alumnos.map((alumno) => (
                <li
                  key={alumno.id}
                  className={`list-group-item d-flex justify-content-between align-items-center 
                    ${alumnoActualId === alumno.id ? 'bg-warning' : ''} 
                    ${alumnosResaltados.some(a => a.nombre === alumno.nombre) ? 'bg-success text-white' : ''}`}
                >
                  {alumno.nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsignarAlumno;
