import express from "express";

const router = express.Router();
import appointmentsController from "../controllers/appointmentsController.js";
import { verifyToken, checkRole } from "../middlewares/authMiddleware.js";

// Rutas básicas CRUD
router
.route("/")
.get(verifyToken, appointmentsController.getAppointments)
.post(verifyToken, appointmentsController.createAppointment)

router
.route("/:id")
.get(verifyToken, appointmentsController.getAppointmentById)
.put(verifyToken, appointmentsController.updateAppointment)
.delete(verifyToken, appointmentsController.deleteAppointment)

// Rutas adicionales
router.get("/patient/:patientId", verifyToken, appointmentsController.getAppointmentsByPatient);
router.get("/doctor/:doctorId", verifyToken, appointmentsController.getAppointmentsByDoctor);
router.patch("/:id/status", verifyToken, appointmentsController.changeAppointmentStatus);

export default router;