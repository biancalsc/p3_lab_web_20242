import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Importando o arquivo de estilos
import App from './App'; 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
