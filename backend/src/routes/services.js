import express from "express";

const router = express.Router();
import servicesController from "../controllers/servicesController.js";

router
.route("/")
.get(servicesController.getServices)
.post(servicesController.createService)

router
.route("/:id")
.get(servicesController.getServiceById)
.put(servicesController.updateService)
.delete(servicesController.deleteService)

export default router;