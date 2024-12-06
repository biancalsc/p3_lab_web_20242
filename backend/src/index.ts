import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./database/conection";
import reservationRoutes from "./routes/reservationRoutes";

dotenv.config();

const app = express();

// Configurar o CORS para permitir requisições de origens diferentes (se necessário)
app.use(cors());

// Configurar o parser para o JSON no corpo das requisições
app.use(express.json());

// Conectar ao banco de dados MongoDB
connect();

// Definir as rotas
app.use(reservationRoutes);

// Configurar a porta 3000 e iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
