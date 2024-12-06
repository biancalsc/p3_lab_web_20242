import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

const ListReservations: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]); // Estado para armazenar as reservas
  const [loading, setLoading] = useState<boolean>(true); // Estado para mostrar loading
  const [error, setError] = useState<string>(''); // Estado para exibir mensagens de erro

  // Função para buscar as reservas
  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://192.168.0.149:3000/api/reservas'); // Requisição GET para buscar as reservas
      setReservations(response.data); // Atualiza o estado com as reservas recebidas
      setLoading(false); // Remove o loading
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
      setError('Não foi possível carregar as reservas.'); // Mensagem de erro
      setLoading(false); // Remove o loading
    }
  };

  // Função para excluir uma reserva
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://192.168.0.149:3000/api/reservas/${id}`); // Requisição DELETE
      fetchReservations(); // Recarrega as reservas após excluir
    } catch (error) {
      console.error('Erro ao excluir reserva:', error);
      setError('Não foi possível excluir a reserva.');
    }
  };

  useEffect(() => {
    fetchReservations(); // Chama a função para buscar as reservas ao carregar a tela
  }, []); // O array vazio garante que a função só execute uma vez ao carregar

  return (
    <div className="list-reservations">
      <h2>Lista de Reservas</h2>
      
      {/* Exibe mensagem de erro, se houver */}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Exibe loading enquanto os dados são carregados */}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          {/* Botão para criar nova reserva */}
          <div className="button-container">
            <Link to="/create" className="button create-btn">Criar Nova Reserva</Link>
          </div>

          {/* Tabela de reservas */}
          <table>
            <thead>
              <tr>
                <th>Nome do Cliente</th>
                <th>Número da Mesa</th>
                <th>Data e Hora</th>
                <th>Status</th>
                <th>Contato</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation: any) => (
                <tr key={reservation._id}>
                  <td>{reservation.customerName}</td>
                  <td>{reservation.tableNumber}</td>
                  <td>{new Date(reservation.reservationDate).toLocaleString()}</td>
                  <td>{reservation.status}</td>
                  <td>{reservation.customerContact}</td>
                  <td>
                    {/* Botão para editar */}
                    <Link to={`/edit/${reservation._id}`} className="button edit-btn">Editar</Link>

                    {/* Botão para excluir */}
                    <button 
                      className="button delete-btn"
                      onClick={() => handleDelete(reservation._id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ListReservations;
