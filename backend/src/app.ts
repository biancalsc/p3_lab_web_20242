import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes/routes";
import connect from "./database/conection";

dotenv.config();

// Cria o aplicativo Express
const app = express();

// Middleware para suporte a JSON
app.use(express.json());

// Configuração de CORS
app.use(cors());

// Conecta ao banco de dados
connect();

// Define as rotas
app.use("/reservations", routes);

export default app;
