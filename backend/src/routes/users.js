/*
Campos:
appointmentDate,
appointmentTime,
patient-id,
service-id,
appointment-confirmation,
problem-description,
appointment-status,
doctor-id,
*/

import { Schema, model } from "mongoose";
const AppointmentSchema = new Schema(
    {
        appointmentDate: {
            type: String,
            required: true,
        },
        appointmentTime: {
            type: String,
            required: true,
        },
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "Patients",
            required: true,
        },
        serviceId: {
            type: Schema.Types.ObjectId,
            ref: "Services",
            required: true,
        },
        appointmentConfirmation: {
            type: Boolean,
            required: true,
        },
        problemDescription: {
            type: String,
            required: true,
        },
        appointmentStatus: {
            type: String,
            required: true,
        },
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "Doctors",
            required: true,
        }, 
    },
    {
        timestamps: true,
        strict: false,
    }
);

export default model("Appointments", AppointmentSchema);
