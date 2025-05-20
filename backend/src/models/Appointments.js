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
            // No requerido inicialmente, será asignado por un administrador
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
            // No requerido inicialmente, será asignado por un administrador
        }
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model("appointments", appointmentsSchema);

// /*
// Campos:
// appointmentDate,
// appointmentTime,
// patient-id,
// service-id,
// appointment-confirmation,
// problem-description,
// appointment-status,
// doctor-id,
// */

// import { Schema, model } from "mongoose";
// const AppointmentSchema = new Schema(
//     {
//         appointmentDate: {
//             type: String,
//             required: true,
//         },
//         appointmentTime: {
//             type: String,
//             required: true,
//         },
//         patientId: {
//             type: Schema.Types.ObjectId,
//             ref: "Patients",
//             required: true,
//         },
//         serviceId: {
//             type: Schema.Types.ObjectId,
//             ref: "Services",
//             required: true,
//         },
//         appointmentConfirmation: {
//             type: Boolean,
//             required: true,
//         },
//         problemDescription: {
//             type: String,
//             required: true,
//         },
//         appointmentStatus: {
//             type: String,
//             required: true,
//         },
//         doctorId: {
//             type: Schema.Types.ObjectId,
//             ref: "Doctors",
//             required: true,
//         }, 
//     },
//     {
//         timestamps: true,
//         strict: false,
//     }
// );

// export default model("Appointments", AppointmentSchema);
