import express from "express";

const router = express.Router();
import patientsController from "../controllers/patientsController.js";

router
.route("/")
.get(patientsController.getPatients)
.post(patientsController.createPatient)

router
.route("/:id")
.get(patientsController.getPatientById)
.put(patientsController.updatePatient)
.delete(patientsController.deletePatient)

export default router;
