import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Importando useNavigate e useParams
import './style.css';

const EditReservation: React.FC = () => {
  const { id } = useParams(); // Obtendo o ID da reserva da URL
  const navigate = useNavigate();

  // Estados para armazenar os dados da reserva
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState<number | string>('');
  const [reservationDate, setReservationDate] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [status, setStatus] = useState('reservado');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Função para buscar os dados da reserva ao carregar a página
  const fetchReservation = async () => {
    try {
      const response = await axios.get('http://192.168.0.149:3000/api/reservas');
      const data = response.data;
      setCustomerName(data.customerName);
      setTableNumber(data.tableNumber);
      setReservationDate(data.reservationDate);
      setCustomerContact(data.customerContact);
      setStatus(data.status);
      setLoading(false); // Dados carregados, desativa o loading
    } catch (error) {
      console.error('Erro ao carregar a reserva:', error);
      setMessage('Erro ao carregar a reserva');
      setAlertType('error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservation(); // Chama a função ao carregar o componente
  }, [id]);

  // Função para atualizar a reserva
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://192.168.0.149:3000/api/reservas/${id}`, {
        customerName,
        tableNumber,
        reservationDate,
        customerContact,
        status,
      });

      setMessage('Reserva atualizada com sucesso!');
      setAlertType('success');
      setTimeout(() => navigate('/'), 1500); // Redireciona após 1.5 segundos
    } catch (error) {
      console.error('Erro ao atualizar reserva:', error);
      setMessage('Erro ao atualizar reserva');
      setAlertType('error');
    }
  };

  return (
    <div className="edit-reservation">
      <h2>Editar Reserva</h2>

      {/* Exibe a mensagem de sucesso ou erro */}
      {message && (
        <div className={`alert alert-${alertType}`} style={{ animation: 'fadeIn 1s ease' }}>
          {message}
        </div>
      )}

      {/* Formulário de edição */}
      {loading ? (
        <div>Carregando...</div> // Exibe "Carregando..." enquanto os dados são carregados
      ) : (
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
            <button type="submit">Atualizar Reserva</button>
            <button onClick={() => navigate('/')} type="button">Voltar para Lista de Reservas</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditReservation;
