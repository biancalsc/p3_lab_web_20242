// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateReservation from "./pages/create/CreateReservation";
import ListReservations from "./pages/list/ListReservations";
import EditReservation from "./pages/edit/EditReservation";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Sistema de Reservas</h1>
        <Routes>
          <Route path="/" element={<ListReservations />} />
          <Route path="/create" element={<CreateReservation />} />
          <Route path="/edit/:id" element={<EditReservation />} /> {/* Rota para edição */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
