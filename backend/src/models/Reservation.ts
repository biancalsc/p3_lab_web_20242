import mongoose, { Schema, Document } from "mongoose";

// Interface para tipar o modelo de reserva
export interface IReservation extends Document {
    customerName: string; // Nome do Cliente
    tableNumber: number; // Número da Mesa
    reservationDate: Date; // Data e Hora da Reserva
    status: "reservado" | "ocupado" | "disponível"; // Status da Reserva
    customerContact: string; // Contato do Cliente
}

// Esquema do Mongoose para reservas
const ReservationSchema: Schema = new Schema(
    {
        customerName: { type: String, required: true, trim: true },
        tableNumber: { type: Number, required: true, min: 1 },
        reservationDate: { type: Date, required: true },
        status: {
            type: String,
            enum: ["reservado", "ocupado", "disponível"],
            default: "reservado",
        },
        customerContact: { type: String, required: true, trim: true },
    },
    {
        timestamps: true, // Adiciona campos createdAt e updatedAt
    }
);

// Exporta o modelo baseado no esquema
export default mongoose.model<IReservation>("Reservation", ReservationSchema);
