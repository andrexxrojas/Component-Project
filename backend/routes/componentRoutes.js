import express from "express";
import { newComponent, saveComponent, deleteComponent, getComponents, getComponent } from "../controllers/componentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/new-component", protect, newComponent)
router.put("/save-component", protect, saveComponent)
router.delete("/delete-component/:id", protect, deleteComponent)
router.get("/", protect, getComponents);
router.get("/:id", protect, getComponent);

export default router;