
/*
Campos:
user_id,
appointment_id,
rating_score,
comment
*/
// Modelo para calificaciones de citas

import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "El ID del usuario es obligatorio"],
        ref: 'patients' // Asumimos que solo los pacientes pueden dejar valoraciones
    },
    appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointments',
        required: [true, "El ID de la cita es obligatorio"]
    },
    rating_score: {
        type: Number,
        required: [true, "La puntuación es obligatoria"],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: false,
        maxlength: 500
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Ratings", RatingSchema);
