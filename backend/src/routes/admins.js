import express from "express";

const router = express.Router();
import adminsController from "../controllers/adminsController.js";

router
.route("/")
.get(adminsController.getAdmins)
.post(adminsController.createAdmin)

router
.route("/:id")
.get(adminsController.getAdminById)
.put(adminsController.updateAdmin)
.delete(adminsController.deleteAdmin)

export default router;
