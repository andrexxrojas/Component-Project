import express from "express";
import {
    newProject,
    updateProject,
    deleteProject,
    getProjects,
    getProject,
    addComponentToProject, removeComponentFromProject
} from "../controllers/projectController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/new-project", protect, newProject);
router.put("/update-project", protect, updateProject);
router.delete("/delete-project/:id", protect, deleteProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProject);
router.put("/add-component", protect, addComponentToProject);
router.put("/remove-component", protect, removeComponentFromProject);

export default router;
