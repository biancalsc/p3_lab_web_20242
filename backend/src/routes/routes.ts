import { Router } from "express";
import ReservationController from "../controllers/ReservationController";

const routes = Router();

// Rota para criar uma nova reserva
routes.post("/", ReservationController.create);

// Rota para listar todas as reservas (ou filtrar por cliente/mesa)
routes.get("/", ReservationController.list);

// Rota para atualizar uma reserva existente pelo ID
routes.put("/:id", ReservationController.update);

// Rota para deletar uma reserva existente pelo ID
routes.delete("/:id", ReservationController.delete);

export default routes;
