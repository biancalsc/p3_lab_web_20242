import { Request, Response } from "express";
import Reservation from "../models/Reservation";

// Criar uma nova reserva
export default class ReservationController {
    static async create(req: Request, res: Response): Promise<Response> {
        const { customerName, tableNumber, reservationDate, status, customerContact } = req.body;

        try {
            const newReservation = new Reservation({
                customerName,
                tableNumber,
                reservationDate,
                status,
                customerContact
            });

            await newReservation.save();
            return res.status(201).json(newReservation);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao criar reserva:", error.message);
                return res.status(500).json({ message: "Erro interno ao criar reserva" });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(500).json({ message: "Erro desconhecido" });
            }
        }
    }

    // Listar todas as reservas
    static async list(req: Request, res: Response): Promise<Response> {
        const { customerName, tableNumber } = req.query;

        try {
            const filters: any = {};
            if (customerName) {
                filters.customerName = customerName;
            }
            if (tableNumber) {
                filters.tableNumber = tableNumber;
            }

            const reservations = await Reservation.find(filters);
            return res.status(200).json(reservations);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao listar reservas:", error.message);
                return res.status(500).json({ message: "Erro interno ao listar reservas" });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(500).json({ message: "Erro desconhecido" });
            }
        }
    }

    // Atualizar uma reserva
    static async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { customerName, tableNumber, reservationDate, status, customerContact } = req.body;

        try {
            const updatedReservation = await Reservation.findByIdAndUpdate(
                id,
                { customerName, tableNumber, reservationDate, status, customerContact },
                { new: true }
            );

            if (!updatedReservation) {
                return res.status(404).json({ message: "Reserva não encontrada" });
            }

            return res.status(200).json(updatedReservation);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao atualizar reserva:", error.message);
                return res.status(500).json({ message: "Erro interno ao atualizar reserva" });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(500).json({ message: "Erro desconhecido" });
            }
        }
    }

    // Excluir uma reserva
    static async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const deletedReservation = await Reservation.findByIdAndDelete(id);

            if (!deletedReservation) {
                return res.status(404).json({ message: "Reserva não encontrada" });
            }

            return res.status(200).json({ message: "Reserva removida com sucesso" });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao excluir reserva:", error.message);
                return res.status(500).json({ message: "Erro interno ao excluir reserva" });
            } else {
                console.error("Erro desconhecido:", error);
                return res.status(500).json({ message: "Erro desconhecido" });
            }
        }
    }
}
