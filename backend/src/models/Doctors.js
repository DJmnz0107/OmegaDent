import { Schema, model } from "mongoose";

/*
Campos del modelo Doctors:
- name: Nombre del doctor (String, requerido)
- lastName: Apellido del doctor (String, requerido)
- dui: Documento Único de Identidad (String)
- birthDate: Fecha de nacimiento (Date)
- specialty: Especialidad médica (String)
- phoneNumber: Número de teléfono (String)
- userId: ID del usuario asociado para autenticación (ObjectId, ref: "User")
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
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model("doctors", doctorsSchema);