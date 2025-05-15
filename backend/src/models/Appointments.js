import { Schema, model } from "mongoose";

/*
Campos del modelo Appointments:
- appointment_date: Fecha de la cita (Date, requerido)
- appointment_time: Hora de la cita en formato de cadena (String, requerido)
- patient_id: ID del paciente asociado a la cita (ObjectId, ref: "Patient", requerido)
- service_id: ID del servicio odontológico a realizar (ObjectId, ref: "Service", requerido)
- appointment_confirmation: Confirmación de la cita por parte del paciente (Boolean, default: false)
- problem_description: Descripción del problema o motivo de la consulta (String)
- appointment_status: Estado actual de la cita (String, enum: ["pendiente", "completada", "cancelada"], default: "pendiente")
- doctor_id: ID del doctor asignado a la cita (ObjectId, ref: "Doctor", requerido)
*/

const appointmentsSchema = new Schema(
    {
        appointment_date: {
            type: Date,
            required: true,
        },
        appointment_time: {
            type: String,
            required: true,
        },
        patient_id: {
            type: Schema.Types.ObjectId,
            ref: "patients",
            required: true,
        },
        service_id: {
            type: Schema.Types.ObjectId,
            ref: "services",
            required: true,
        },
        appointment_confirmation: {
            type: Boolean,
            default: false,
        },
        problem_description: {
            type: String,
        },
        appointment_status: {
            type: String,
            enum: ["pendiente", "completada", "cancelada"],
            default: "pendiente",
        },
        doctor_id: {
            type: Schema.Types.ObjectId,
            ref: "doctors",
            required: true,
        }
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model("appointments", appointmentsSchema);