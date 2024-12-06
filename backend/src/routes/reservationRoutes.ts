import express from "express";
import ReservationController from "../controllers/ReservationController";

const router = express.Router();

// Rota para criar uma nova reserva
router.post("/api/reservas", ReservationController.create);

// Rota para listar todas as reservas com filtros opcionais
router.get("/api/reservas", ReservationController.list);

// Rota para atualizar uma reserva pelo ID
router.put("/api/reservas/:id", ReservationController.update);

// Rota para excluir uma reserva pelo ID
router.delete("/api/reservas/:id", ReservationController.delete);

export default router;
