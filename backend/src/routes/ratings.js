import express from "express";

const router = express.Router();
import ratingsController from "../controllers/ratingsController.js";

// Rutas agrupadas por método y ruta base
router
.route("/")
.get(ratingsController.getRatings)
.post(ratingsController.createRating)

router
.route("/:id")
.get(ratingsController.getRatingById)
.put(ratingsController.updateRating)
.delete(ratingsController.deleteRating)

// Rutas adicionales específicas
router.get("/user/:userId", ratingsController.getRatingsByUser);
router.get("/appointment/:appointmentId", ratingsController.getRatingsByAppointment);

export default router;