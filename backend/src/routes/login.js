import express from "express";
import loginController from "../controllers/loginController.js";

const router = express.Router();

/**
 *Rutas para autenticación en OmegaDent
 */

// Ruta POST para iniciar sesión (login)
router.post("/", loginController.login);


export default router;
