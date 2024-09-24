import React, { useEffect, useState } from 'react';
import './Bitacora.css';
import { getProfile } from '../../../Service/Apis-Admin/PerfilUsuario';
import { getBitacorasBySede } from '../../../Service/Apis-Admin/HistoricoBitacora';

const Bitacora = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }
        const profileData = await getProfile(token);
        if (!profileData || !profileData.sede) {
          console.log('No sede_id found in profile data');
          return;
        }
        const bitacoraData = await getBitacorasBySede(profileData.sede, token);
        setLogs(bitacoraData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="bitacora-admin mt-5">
      <h2>Bitácora de Actividades</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="bitacora-container">
            {currentLogs.map((log, index) => (
              <div key={index} className="bitacora-item">
                <div className="bitacora-label">
                  <span className="bg-green">{new Date(log.date).toLocaleDateString('en-CA')}</span>
                </div>
                <div className="bitacora-content">
                  <span className="bitacora-time">
                    <i className="fas fa-clock" /> {new Date(log.date).toLocaleTimeString()}
                  </span>
                  <div className="bitacora-header">
                    <h3 className="bitacora-title">{log.username}</h3>
                    <span className="bitacora-user-id">ID: {log.id_user}</span>
                  </div>
                  <div className="bitacora-body">
                    <p><strong>Acción:</strong> {log.action}</p>
                    <p><strong>Detalles:</strong> {log.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav className="pagination-nav">
            <ul className='pagination justify-content-center'>
              {Array.from({ length: Math.ceil(logs.length / logsPerPage) }, (_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <a onClick={() => paginate(i + 1)} href='#!' className='page-link'>
                    {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Bitacora;
