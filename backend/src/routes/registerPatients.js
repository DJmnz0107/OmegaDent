import express from "express";
import registerPatientsController from "../controllers/registerPatientsController.js";

const router = express.Router();

/**
 * Rutas para el registro y verificación de pacientes
 */

// Ruta POST para registrar un nuevo paciente
router.post("/", registerPatientsController.register);

// Ruta POST para verificar el código enviado por correo
router.post("/verify", registerPatientsController.verifyEmail);

export default router;
