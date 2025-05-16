import express from "express";

const router = express.Router();
import assistantsController from "../controllers/assistantsController.js";

router
.route("/")
.get(assistantsController.getAssistants)
.post(assistantsController.createAssistant)

router
.route("/:id")
.get(assistantsController.getAssistantById)
.put(assistantsController.updateAssistant)
.delete(assistantsController.deleteAssistant)

export default router;
