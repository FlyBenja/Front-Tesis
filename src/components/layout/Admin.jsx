import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import '../../index.css'; 

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`wrapper ${showSidebar ? '' : 'sidebar-collapsed'} mt-5 `}>
      <Sidebar showSidebar={showSidebar} />
      <div className={`content-wrapper ${showSidebar ? '' : 'content-active'}`}>
        {/* Pasamos showSidebar como un prop */}
        <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        <div className={`admin-content ${showSidebar ? '' : 'active'}`}>
          <h2>Contenido del Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default Admin;
