import { Schema, model } from "mongoose";

/*
Campos del modelo Admins:
- email: Correo electrónico del administrador (String, requerido, único)
- password: Contraseña del administrador (String, requerido)
*/

const adminsSchema = new Schema(
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
        }
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model("admins", adminsSchema);
