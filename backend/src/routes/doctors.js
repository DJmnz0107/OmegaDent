import express from "express";

const router = express.Router();
import doctorsController from "../controllers/doctorsController.js";

router
.route("/")
.get(doctorsController.getDoctors)
.post(doctorsController.createDoctor)

router
.route("/:id")
.get(doctorsController.getDoctorById)
.put(doctorsController.updateDoctor)
.delete(doctorsController.deleteDoctor)

export default router;  