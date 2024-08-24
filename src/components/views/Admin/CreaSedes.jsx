import { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 
import '../../layout/Admin/EstudiantesAdmin.css';

const EstudiantesAdmin = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate(); 

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseTimeLine = () => {
    setSelectedStudent(null);
  };

  const estudiantes = [
    { id: 1, nombre: 'Josue Benjamin Aldana Ramos' },
    { id: 2, nombre: 'Oscar David Alvarez Martinez' },
    { id: 3, nombre: 'Bryan Yeremy Arrazola Cisneros' },
    { id: 4, nombre: 'Cristian Paul Borja Martinez' },
    { id: 5, nombre: 'Carolay Estephania Cante De Leon' },
    { id: 6, nombre: 'Dulce María Carías Bran' },
    { id: 7, nombre: 'Kevin Leonel Carranza Marroquin' },
    { id: 8, nombre: 'Mynor Estuardo Junnior Ceron Gaitan' },
    { id: 9, nombre: 'Elisa Noemí Dardón Salguero' },
    { id: 10, nombre: 'Carmen Mireya De La Cruz Barrientos' },
    { id: 11, nombre: 'Huver Roberto Donis Cordova' },
    { id: 12, nombre: 'Maria Isabel Estrada López' },
    { id: 13, nombre: 'Luis Fernando Fuentes Orellana' },
    { id: 14, nombre: 'Andrea Michelle García Herrera' },
    { id: 15, nombre: 'Julio César Hernández Álvarez' },
  ];
  const timelineEvents = [
    { date: '2024-08-20', title: 'Inscripción completada', description: 'El estudiante se inscribió en el curso de matemáticas.' },
    { date: '2024-09-10', title: 'Examen parcial', description: 'El estudiante realizó el examen parcial de historia.' },
    { date: '2024-09-15', title: 'Proyecto final', description: 'El estudiante entregó el proyecto final de ciencias.' },
    { date: '2024-10-05', title: 'Evaluación final', description: 'El estudiante asistió a la evaluación final.' },
    { date: '2024-08-20', title: 'Inscripción completada', description: 'El estudiante se inscribió en el curso de matemáticas.' },
    { date: '2024-09-10', title: 'Examen parcial', description: 'El estudiante realizó el examen parcial de historia.' },
    { date: '2024-09-15', title: 'Proyecto final', description: 'El estudiante entregó el proyecto final de ciencias.' },
    { date: '2024-10-05', title: 'Evaluación final', description: 'El estudiante asistió a la evaluación final.' },
    { date: '2024-08-20', title: 'Inscripción completada', description: 'El estudiante se inscribió en el curso de matemáticas.' },
    { date: '2024-09-10', title: 'Examen parcial', description: 'El estudiante realizó el examen parcial de historia.' },
    { date: '2024-09-15', title: 'Proyecto final', description: 'El estudiante entregó el proyecto final de ciencias.' },
    { date: '2024-10-05', title: 'Evaluación final', description: 'El estudiante asistió a la evaluación final.' }
  ];


  const filteredEstudiantes = estudiantes.filter((estudiante) =>
    estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="estudiantes-admin">
      <h2>Administración de Estudiantes</h2>
      <div className="filters-container d-flex align-items-center mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* Selectores */}
        <div className="d-flex gap-2">
              <select className="form-select">
                <option>Año</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
              </select>
              <select className="form-select">
                <option>Sede</option>
                <option>Guastatoya</option>
                <option>Sanarate</option>
                <option>Sede 3</option>
              </select>
              <select className="form-select">
                <option>Curso</option>
                <option>Curso 1</option>
                <option>Curso 2</option>
                <option>Curso 3</option>
              </select>
            </div>
      </div>
      <div className="d-flex flex-grow-1 content-area">
        {filteredEstudiantes.length === 0 ? (
          <div className="no-students-container">
            <h4>No hay estudiantes subidos</h4>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate('/admin/SubirExcel')}
            >
              Subir Estudiantes
            </button>
          </div>
        ) : (
          <>
            <div className="student-list-container">
              <div className="student-list">
                {filteredEstudiantes.map((estudiante) => (
                  <div
                    key={estudiante.id}
                    className="student-item"
                    onClick={() => handleSelectStudent(estudiante)}
                  >
                    <p>{estudiante.nombre}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedStudent && (
                  <div className="timeline-container">
                    <div className="timeline-header d-flex justify-content-between align-items-center">
                      <h3>Time Line</h3>
                      <FaTimes className="close-icon" onClick={handleCloseTimeLine} />
                    </div>
                    <div className="timeline-content">
                      {selectedStudent.nombre}
                    </div>
                    <div className="timeline-events">
                      {timelineEvents.map((event, index) => (
                        <div key={index} className="timeline-event">
                          <h4>{event.date}: {event.title}</h4>
                          <p>{event.description}</p>
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-primary timeline-btn">Visualizar Tareas</button>
                  </div>
                )}
          </>
        )}
      </div>
    </div>
  );
};

export default EstudiantesAdmin;
