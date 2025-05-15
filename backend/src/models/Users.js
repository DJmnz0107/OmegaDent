import { Schema, model } from "mongoose";

/*
Campos del modelo Users:
- email: Correo electrónico del usuario (String, requerido, único)
- password: Contraseña del usuario (String, requerido)
- userType: Tipo de usuario en el sistema (String, enum: ["administrador", "doctor", "asistente"])
- verified: Estado de verificación de la cuenta (Boolean, default: false)
*/

const usersSchema = new Schema(
    {
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
        userType: {
            type: String,
            enum: ["administrador", "doctor", "asistente"],
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model("users", usersSchema);