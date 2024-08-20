import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Importa BrowserRouter y Routes
import Admin from './components/layout/Admin';
import Login from './components/views/Login';  // Asegúrate de que esta ruta sea correcta
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Importar JavaScript de Bootstrap

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />  
        <Route path="/" element={<Login />} />  
      </Routes>
    </Router>
  </React.StrictMode>,
);
