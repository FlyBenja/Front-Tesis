import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AlertSuccess from '../../../../Modals/Fuentes/AlertSuccess';
import AlertError from '../../../../Modals/Fuentes/AlertError';
import { getProfile } from '../../../../Service/Apis-Admin/PerfilUsuario';
import { getCursosPorSede } from '../../../../Service/Apis-Admin/CursosAsignados';
import { getAvailableYears } from '../../../../Service/Apis-Admin/AñosDisponibles'; // Servicio para obtener años
import { getStudentsList } from '../../../../Service/Apis-Admin/ListaEstudiantes'; // Servicio para obtener la lista de estudiantes
import '../Estilos/Estudiantes.css';

const Estudiantes = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null); // Estado para el perfil del usuario
  const [cursos, setCursos] = useState([]); // Estado para los cursos
  const [selectedCurso, setSelectedCurso] = useState(''); // Estado para el curso seleccionado
  const [years, setYears] = useState([]); // Estado para los años disponibles
  const [selectedYear, setSelectedYear] = useState(''); // Estado para el año seleccionado (la descripción)
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [studentsList, setStudentsList] = useState([]); // Estado para almacenar la lista de estudiantes

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        if (!token) {
          AlertError({ message: 'Token no encontrado. Por favor, inicia sesión de nuevo.' });
          return;
        }

        const profileData = await getProfile(token); // Pasa el token a la función de obtención de perfil
        setUserData(profileData);

        if (profileData && profileData.sede) {
          const cursosData = await getCursosPorSede(profileData.sede, token); // Usa "sede" en la solicitud de cursos
          setCursos(cursosData);

          // Verificar si no hay cursos asignados
          if (cursosData.length === 0) {
            AlertError({ message: 'No existen cursos asignados.' });
          }

          // Selección automática del curso basado en el mes actual
          const currentMonth = new Date().getMonth() + 1; // Mes actual (1-12)
          const defaultCurso = currentMonth <= 6 ? 1 : 2; // Course_id = 1 para meses 1-6, 2 para 7-12
          setSelectedCurso(defaultCurso); // Establece el curso por defecto
        } else {
          AlertError({ message: 'Sede no encontrada en los datos del perfil.' });
        }

        // Obtener los años disponibles y seleccionar el año actual por defecto
        const yearsData = await getAvailableYears(); // Llama al servicio para obtener los años
        setYears(yearsData); // Guarda los años disponibles en el estado

        // Obtener el año actual
        const currentYear = new Date().getFullYear(); // Año actual
        const selectedYearObj = yearsData.find((year) => year.year === currentYear); // Encuentra el objeto de año que coincide con el año actual
        if (selectedYearObj) {
          setSelectedYear(selectedYearObj.year); // Establece la descripción del año seleccionado
        }
      } catch (error) {
        AlertError({ message: 'No existen cursos Asignados' });
      } finally {
        setLoading(false); // Finaliza el loading independientemente del resultado
      }
    };

    fetchData();
  }, []);

  // Este useEffect se ejecutará cada vez que cambie el curso o el año
  useEffect(() => {
    const fetchStudentsList = async () => {
      if (!userData || !selectedCurso || !selectedYear) {
        return;
      }

      try {
        const studentsData = await getStudentsList(userData.sede, selectedCurso, selectedYear);
        setStudentsList(studentsData.users); // Guarda la lista en el estado
      } catch (error) {
        // Manejo de errores con Axios
        if (error.response && error.response.status === 404) {
          setStudentsList([]); // Esto asegura que se muestre el mensaje "No hay estudiantes subidos"
        } else {
          AlertError({ message: 'Error al obtener la lista de estudiantes. Inténtalo de nuevo.' });
        }
      }
    };

    if (selectedCurso && selectedYear) {
      fetchStudentsList(); // Llama al servicio si curso y año están seleccionados
    }
  }, [selectedCurso, selectedYear, userData]); // Se ejecuta cuando cambien estos valores

  // Función para manejar la selección del curso manualmente
  const handleCursoChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCurso(selectedValue); // Cambiar el curso seleccionado
  };

  // Función para manejar la selección del año manualmente
  const handleYearChange = (event) => {
    const selectedYearValue = event.target.value; // Este es el `year_id`

    // Buscar la descripción (el `year`) usando el `year_id`
    const selectedYearObj = years.find((year) => year.year_id === parseInt(selectedYearValue));

    if (selectedYearObj) {
      setSelectedYear(selectedYearObj.year); // Cambiar la descripción del año seleccionado
    }
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

  // Función para obtener la inicial del nombre si no hay foto de perfil
  const getInitial = (nombre) => {
    return nombre ? nombre.charAt(0).toUpperCase() : ''; // Retorna la primera letra del nombre en mayúscula
  };

  // Si está cargando, muestra un mensaje o un loader
  if (loading) {
    return <div>Cargando datos...</div>;
  }

  // Verifica que los años y cursos estén disponibles antes de intentar renderizarlos
  if (years.length === 0 || cursos.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh', textAlign: 'center' }}>
        <p className="fw-bold fs-4" style={{ color: '#333' }}>No hay cursos asignados.</p>
        <p className="fw-bold fs-4" style={{ color: '#333' }}>Favor de comunicarse con la central.</p>
      </div>
    );
  }

  const filteredEstudiantes = studentsList.filter((estudiante) =>
    estudiante.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simulación de eventos de línea de tiempo para cada estudiante
  const timelineEvents = [
    { date: '2024-08-20', title: 'Inscripción completada', description: 'El estudiante se inscribió en el curso de matemáticas.' },
    { date: '2024-09-10', title: 'Examen parcial', description: 'El estudiante realizó el examen parcial de historia.' },
    { date: '2024-09-15', title: 'Proyecto final', description: 'El estudiante entregó el proyecto final de ciencias.' },
    { date: '2024-10-05', title: 'Evaluación final', description: 'El estudiante asistió a la evaluación final.' },
  ];

  return (
    <div className="estudiantes-admin">
      <h2>Administración de Estudiantes</h2>
      <div className="filters-container d-flex align-items-center mb-4 ">
        <input
          type="text"
          className="form-control "
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="d-flex gap-2 select-container">
          <select
            className="form-select select-year"
            value={years.find((year) => year.year === selectedYear)?.year_id || ''}
            onChange={handleYearChange} // Cambia el año cuando el usuario selecciona uno diferente
          >
            <option key="default-year" value="">
              Seleccione un año
            </option>{' '}
            {/* Opción por defecto */}
            {years.map((year) => (
              <option key={year.year_id} value={year.year_id}>
                {year.year} {/* Muestra la descripción del año en la opción */}
              </option>
            ))}
          </select>
          <select
            className="form-select select-course"
            value={selectedCurso}
            onChange={handleCursoChange} // Cambia el curso cuando el usuario selecciona uno diferente
          >
            <option key="default-course">Seleccione un curso</option> {/* Clave única para la opción por defecto */}
            {cursos.map((curso) => (
              <option key={curso.course_id} value={curso.course_id}>
                {curso.Course.courseName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex flex-grow-1 content-area">
        {filteredEstudiantes.length === 0 ? (
          <div className="no-students-container">
            <h4>No hay estudiantes subidos</h4>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate('/admin/SubirExcelAlumnos')}
            >
              Subir Estudiantes
            </button>
          </div>
        ) : (
          <>
            <div className="estudiante-container">
              <div className="student-list-container">
                {filteredEstudiantes.map((estudiante) => (
                  <div
                    key={estudiante.user_id}
                    className="student-item"
                    onClick={() => handleSelectStudent(estudiante)}
                  >
                    {estudiante.profilePhoto ? (
                      <img src={estudiante.profilePhoto} alt="Avatar" className="avatar" />
                    ) : (
                      <div
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: '40px', height: '40px', fontSize: '20px' }}
                      >
                        {getInitial(estudiante.userName)}
                      </div>
                    )}
                    <p className="m-0">{estudiante.userName}</p>
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
                <div className="timeline-content">{selectedStudent.userName}</div>
                <div className="timeline-events">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="timeline-event">
                      <h4>
                        {event.date}: {event.title}
                      </h4>
                      <p>{event.description}</p>
                    </div>
                  ))}
                </div>
                <button
                  className="btn btn-primary timeline-btn"
                  onClick={() =>
                    navigate('/admin/tarealum', { state: { student: selectedStudent } })
                  }
                >
                  Visualizar Tareas
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Estudiantes;
