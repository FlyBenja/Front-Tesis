import './Bitacora.css'; 

const Bitacora = () => {
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
      accion: 'Actualizó un artículo',
      detalle: 'El artículo "Cómo aprender React" fue actualizado con nueva información.',
      fecha: '21 Aug. 2019',
      hora: '15:15'
    },
    {
      id_user: 3,
      nombre_user: 'Supervisor',
      accion: 'Aprobó un informe semanal',
      detalle: 'El informe semanal fue revisado y aprobado por el supervisor.',
      fecha: '20 Aug. 2019',
      hora: '09:45'
    },
    {
      id_user: 4,
      nombre_user: 'Soporte',
      accion: 'Resolvió un ticket de soporte',
      detalle: 'El ticket de soporte #456 ha sido resuelto satisfactoriamente.',
      fecha: '19 Aug. 2019',
      hora: '13:30'
    },
    {
      id_user: 5,
      nombre_user: 'Admin',
      accion: 'Actualizó las políticas de seguridad',
      detalle: 'Se realizaron actualizaciones en las políticas de seguridad del sistema.',
      fecha: '18 Aug. 2019',
      hora: '11:00'
    },
    {
      id_user: 6,
      nombre_user: 'Editor',
      accion: 'Publicó un nuevo artículo',
      detalle: 'Se publicó un nuevo artículo titulado "Mejores prácticas de desarrollo web 2024".',
      fecha: '17 Aug. 2019',
      hora: '10:20'
    },
    {
      id_user: 7,
      nombre_user: 'Admin',
      accion: 'Eliminó un usuario',
      detalle: 'La cuenta de usuario de Jane Doe fue eliminada.',
      fecha: '16 Aug. 2019',
      hora: '14:05'
    },
    {
      id_user: 8,
      nombre_user: 'Supervisor',
      accion: 'Revisó y aprobó un plan de proyecto',
      detalle: 'El plan de proyecto fue revisado y aprobado por el supervisor.',
      fecha: '15 Aug. 2019',
      hora: '09:00'
    },
    {
      id_user: 9,
      nombre_user: 'Admin',
      accion: 'Cambió los permisos de un usuario',
      detalle: 'Se cambiaron los permisos de usuario para Sarah Smith a nivel de editor.',
      fecha: '14 Aug. 2019',
      hora: '12:30'
    },
    {
      id_user: 10,
      nombre_user: 'Soporte',
      accion: 'Realizó mantenimiento en el servidor',
      detalle: 'Se realizó el mantenimiento programado del servidor de la base de datos.',
      fecha: '13 Aug. 2019',
      hora: '18:00'
    },
  ];


  return (
    <div className="bitacora-admin mt-5">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bitacora;
