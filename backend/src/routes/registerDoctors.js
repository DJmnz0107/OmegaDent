import express from "express";
import registerDoctorsController from "../controllers/registerDoctorsController.js";

const router = express.Router();

/**
 * Rutas para el registro de doctores
 */

// Ruta POST para registrar un nuevo doctor
router.post("/", registerDoctorsController.register);

export default router;
