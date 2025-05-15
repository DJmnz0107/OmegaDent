import { Schema, model } from "mongoose";

/*
Campos del modelo Services:
- name: Nombre del servicio dental (String, requerido)
- description: Descripción detallada del servicio (String)
- procedures: Lista de procedimientos incluidos en el servicio (Array de String)
*/

const servicesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        procedures: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model("services", servicesSchema);