import { Schema, model } from "mongoose";

/*
Campos del modelo Doctors:
- name: Nombre del doctor (String, requerido)
- lastName: Apellido del doctor (String, requerido)
- email: Correo electrónico del doctor (String, requerido, único)
- password: Contraseña del doctor (String, requerido)
- dui: Documento Único de Identidad (String)
- birthDate: Fecha de nacimiento (Date)
- specialty: Especialidad médica (String)
- phoneNumber: Número de teléfono (String)
*/

const doctorsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        dui: {
            type: String,
        },
        birthDate: {
            type: Date,
        },
        specialty: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model("doctors", doctorsSchema);