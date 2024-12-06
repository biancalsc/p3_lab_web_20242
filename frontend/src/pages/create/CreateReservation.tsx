import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import './style.css';

const CreateReservation: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState<number | string>('');
  const [reservationDate, setReservationDate] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [status, setStatus] = useState('reservado');
  const [message, setMessage] = useState<string>(''); // Mensagem de sucesso ou erro
  const [alertType, setAlertType] = useState<string>(''); // Tipo de alerta

  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:3000/api/reservas', {
        customerName,
        tableNumber,
        reservationDate,
        customerContact,
        status,
      });

      // Exibe a mensagem de sucesso
      setMessage('Reserva criada com sucesso!');
      setAlertType('success');
      
      // Após a criação, redireciona para a página de lista de reservas
      setTimeout(() => navigate('/'), 1500); // Redireciona após 1.5 segundos
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      setMessage('Erro ao criar reserva');
      setAlertType('error');
    }
  };

  return (
    <div className="create-reservation">
      <h2>Criar Nova Reserva</h2>

      {/* Exibe a mensagem de sucesso ou erro */}
      {message && (
        <div className={`alert alert-${alertType}`} style={{ animation: 'fadeIn 1s ease' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nome do Cliente:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Número da Mesa:</label>
          <input
            type="number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Data e Hora da Reserva:</label>
          <input
            type="datetime-local"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Contato do Cliente:</label>
          <input
            type="text"
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="reservado">Reservado</option>
            <option value="ocupado">Ocupado</option>
            <option value="disponível">Disponível</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit">Criar Reserva</button>
          <button onClick={() => navigate('/')} type="button">Voltar para Lista de Reservas</button>
        </div>
      </form>
    </div>
  );
};

export default CreateReservation;
