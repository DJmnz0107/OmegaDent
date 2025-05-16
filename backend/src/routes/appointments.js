import express from "express";

const router = express.Router();
import appointmentsController from "../controllers/appointmentsController.js";

// Rutas básicas CRUD
router
.route("/")
.get(appointmentsController.getAppointments)
.post(appointmentsController.createAppointment)

router
.route("/:id")
.get(appointmentsController.getAppointmentById)
.put(appointmentsController.updateAppointment)
.delete(appointmentsController.deleteAppointment)

// Rutas adicionales
router.get("/patient/:patientId", appointmentsController.getAppointmentsByPatient);
router.get("/doctor/:doctorId", appointmentsController.getAppointmentsByDoctor);
router.patch("/:id/status", appointmentsController.changeAppointmentStatus);

export default router;