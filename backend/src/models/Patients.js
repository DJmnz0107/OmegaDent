import { Schema, model } from "mongoose";

/*
Campos del modelo Patients:
- name: Nombre del paciente (String, requerido)
- lastname: Apellido del paciente (String, requerido)
- photo: URL o ruta de la foto del paciente (String)
- birthday: Fecha de nacimiento del paciente (Date)
- address: Dirección del paciente (String)
- phoneNumber: Número de teléfono del paciente (String)
- weight: Peso del paciente en kilogramos (Number)
- height: Altura del paciente en centímetros (Number)
- maritalStatus: Estado civil del paciente (String, enum: ["soltero", "casado", "divorciado", "viudo"])
- dui: Documento Único de Identidad del paciente (String)
- recordNumber: Número de registro o expediente médico (String, requerido, único)
- gender: Género del paciente (String, enum: ["masculino", "femenino", "otro"])
- occupation: Ocupación o profesión del paciente (String)
- emergencyContact: Información de contacto de emergencia (Object)
  - firstName: Nombre del contacto (String)
  - lastName: Apellido del contacto (String)
  - phoneNumber: Teléfono del contacto (String)
  - occupation: Ocupación del contacto (String)
  - familyRelationship: Relación familiar con el paciente (String)
- userId: ID del usuario asociado para autenticación (ObjectId, ref: "User")
- status: Estado del paciente en el sistema (String, enum: ["activo", "inactivo"], default: "activo")
*/

const patientsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
        },
        birthday: {
            type: Date,
        },
        address: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        weight: {
            type: Number,
        },
        height: {
            type: Number,
        },
        maritalStatus: {
            type: String,
            enum: ["soltero", "casado", "divorciado", "viudo"],
        },
        dui: {
            type: String,
        },
        recordNumber: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
            enum: ["masculino", "femenino", "otro"],
        },
        occupation: {
            type: String,
        },
        emergencyContact: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            phoneNumber: {
                type: String,
            },
            occupation: {
                type: String,
            },
            familyRelationship: {
                type: String,
            },
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        status: {
            type: String,
            enum: ["activo", "inactivo"],
            default: "activo",
        },
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model("patients", patientsSchema);
