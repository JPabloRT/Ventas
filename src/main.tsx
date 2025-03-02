import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Asegúrate de que 'App' esté importado correctamente
import './styles.css'; // Importar los estilos

// Renderiza el componente principal 'App'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
