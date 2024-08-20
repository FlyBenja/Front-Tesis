import { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Icono de "X"
import { useNavigate } from 'react-router-dom'; // Necesario para redirigir
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/SidebarAdmin';
import '../layout/Admin/EstudiantesAdmin.css';

const EstudiantesAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate(); // Hook para redireccionar

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseTimeLine = () => {
    setSelectedStudent(null);
  };

  // Simulación de una lista vacía de estudiantes para mostrar el mensaje "No hay estudiantes"
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
    { id: 11, nombre: 'Huver Roberto Donis Cordova' }
  ]; // Cambia a un array vacío para simular la falta de estudiantes

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

  // Filtrar estudiantes según el término de búsqueda
  const filteredEstudiantes = estudiantes.filter((estudiante) =>
    estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`wrapper ${showSidebar ? '' : 'sidebar-collapsed'} mt-0`}>
      <Sidebar showSidebar={showSidebar} />
      <div className={`content-wrapper ${showSidebar ? '' : 'content-active'}`}>
        <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

        <div className={`admin-content ${showSidebar ? '' : 'active'} d-flex flex-column`}>
          <h2>Administración de Estudiantes</h2>

          {/* Filtros y barra de búsqueda */}
          <div className="filters-container d-flex align-items-center mb-4">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearch}
            />
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
                <option>Sede 1</option>
                <option>Sede 2</option>
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

          {/* Área de estudiantes */}
          <div className="d-flex flex-grow-1 content-area">
            {filteredEstudiantes.length === 0 ? (
              <div className="no-students-container">
                <h4>No hay estudiantes subidos</h4>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => navigate('/admin/asignaciones')}
                >
                  Subir Estudiantes
                </button>
              </div>
            ) : (
              <>
                {/* Lista de estudiantes */}
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

                {/* Time Line, se muestra solo cuando se selecciona un estudiante */}
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
      </div>
    </div>
  );
};

export default EstudiantesAdmin;
