import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/SidebarAdmin';
import '../layout/Admin/BitacoraAdmin.css'; 

const BitacoraAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logs = [
    {
      id_user: 1,
      nombre_user: 'Admin',
      accion: 'Creó un nuevo usuario',
      detalle: 'Se creó la cuenta para John Doe con el rol de administrador.',
      fecha: '22 Aug. 2019',
      hora: '08:30'
    },
    {
      id_user: 2,
      nombre_user: 'Editor',
      accion: 'Actualizó el artículo',
      detalle: 'El artículo "Cómo aprender React" fue actualizado con nueva información.',
      fecha: '21 Aug. 2019',
      hora: '15:15'
    },
    {
      id_user: 3,
      nombre_user: 'Admin',
      accion: 'Eliminó un usuario',
      detalle: 'Se eliminó la cuenta de usuario para Jane Doe.',
      fecha: '20 Aug. 2019',
      hora: '14:10'
    },
    {
      id_user: 4,
      nombre_user: 'Supervisor',
      accion: 'Revisó el informe semanal',
      detalle: 'El informe semanal fue revisado y aprobado.',
      fecha: '19 Aug. 2019',
      hora: '09:45'
    },
    {
      id_user: 5,
      nombre_user: 'Admin',
      accion: 'Actualizó las políticas de seguridad',
      detalle: 'Se realizaron actualizaciones en las políticas de seguridad del sistema.',
      fecha: '18 Aug. 2019',
      hora: '11:30'
    },
    {
      id_user: 6,
      nombre_user: 'Soporte',
      accion: 'Resolvió un ticket de soporte',  
      detalle: 'El ticket de soporte #456 ha sido resuelto.',
      fecha: '17 Aug. 2019',
      hora: '13:20'
    },
    {
      id_user: 7,
      nombre_user: 'Editor',
      accion: 'Publicó un nuevo artículo',
      detalle: 'Se publicó un nuevo artículo titulado "Tendencias de desarrollo web 2024".',
      fecha: '16 Aug. 2019',
      hora: '10:15'
    }
  ];

  return (
    <div className={`wrapper ${showSidebar ? '' : 'sidebar-collapsed'} mt-5 `}>
      <Sidebar showSidebar={showSidebar} />
      <div className={`content-wrapper ${showSidebar ? '' : 'content-active'}`}>
        <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        <div className={`admin-content ${showSidebar ? '' : 'active'}`}>
          <h2>Bitácora de Actividades</h2>
          <div className="bitacora-container">
            {logs.map((log, index) => (
              <div key={index} className="bitacora-item">
                <div className="bitacora-label">
                  <span className="bg-green">{log.fecha}</span>
                </div>
                <div className="bitacora-content">
                  <span className="bitacora-time">
                    <i className="fas fa-clock" /> {log.hora}
                  </span>
                  <div className="bitacora-header">
                    <h3 className="bitacora-title">{log.nombre_user}</h3>
                    <span className="bitacora-user-id">ID: {log.id_user}</span>
                  </div>
                  <div className="bitacora-body">
                    <p><strong>Acción: </strong>{log.accion}</p>
                    <p><strong>Detalles: </strong>{log.detalle}</p>
                  </div>
                  <div className="bitacora-footer">
                    <a href="" className="btn btn-primary btn-sm">Ver más</a>
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

export default BitacoraAdmin;
