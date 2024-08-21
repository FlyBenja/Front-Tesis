import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importamos Router, Route y Routes
import Admin from './components/pages/Admin'; // Asegúrate de que la ruta sea correcta
import Login from './components/pages/Login'; // Asegúrate de que esta ruta sea correcta
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importar JavaScript de Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />  
        <Route path="/" element={<Login />} />  
      </Routes>
    </Router>
  </React.StrictMode>
);
