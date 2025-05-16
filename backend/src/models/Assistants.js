import { Schema, model } from "mongoose";

/*
Campos del modelo Assistants:
- email: Correo electrónico del asistente (String, requerido, único)
- password: Contraseña del asistente (String, requerido)
*/

const assistantsSchema = new Schema(
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

export default model("assistants", assistantsSchema);
