import { useEffect, useState } from "react";
import "./Bitacora.css";
import { getProfile } from "../../../Service/Apis-Admin/PerfilUsuario";
import { getBitacorasBySede } from "../../../Service/Apis-Admin/HistoricoBitacora";

const Bitacora = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(3); // Ajustado para mostrar 5 registros por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }
        const profileData = await getProfile(token);
        if (!profileData || !profileData.sede) {
          console.log("No sede_id found in profile data");
          return;
        }
        const bitacoraData = await getBitacorasBySede(profileData.sede, token);
        setLogs(bitacoraData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(logs.length / logsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular rango de páginas visible
  const getPageRange = () => {
    let maxPagesBeforeCurrentPage = 2;
    let maxPagesAfterCurrentPage = 2;
    let startPage, endPage;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    return Array.from({ length: endPage + 1 - startPage }, (_, i) => startPage + i);
  };

  return (
    <div className="bitacora-admin mt-5">
      <h2>Bitácora de Actividades</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="bitacora-container">
            {logs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage).map((log, index) => (
              <div key={index} className="bitacora-item">
                <div className="bitacora-label">
                  <span className="bg-green">
                    {new Date(log.date).toLocaleDateString("en-CA")}
                  </span>
                </div>
                <div className="bitacora-content">
                  <span className="bitacora-time">
                    <i className="fas fa-clock" />{" "}
                    {new Date(log.date).toLocaleTimeString()}
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
        </div>
      )}
      <div className="pagination-controls d-flex justify-content-center mt-3">
        <nav className="pagination-nav">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a className="page-link" href="#!" onClick={() => paginate(currentPage - 1)}>&laquo;</a>
            </li>
            {currentPage > 3 && (
              <>
                <li className="page-item"><a className="page-link" href="#!" onClick={() => paginate(1)}>1</a></li>
                {currentPage > 4 && <li className="page-item"><span className="page-link">...</span></li>}
              </>
            )}
            {getPageRange().map(page => (
              <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                <a className="page-link" href="#!" onClick={() => paginate(page)}>{page}</a>
              </li>
            ))}
            {currentPage < (totalPages - 3) && (
              <>
                <li className="page-item"><span className="page-link">...</span></li>
                <li className="page-item"><a className="page-link" href="#!" onClick={() => paginate(totalPages)}>{totalPages}</a></li>
              </>
            )}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <a className="page-link" href="#!" onClick={() => paginate(currentPage + 1)}>&raquo;</a>
            </li>
          </ul> 
        </nav> 
      </div>
    </div>
  );
};

export default Bitacora;
