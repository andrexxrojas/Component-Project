import express from "express";
import {
    newProject,
    updateProject,
    deleteProject,
    getProjects,
    getProject,
    addComponentToProject,
    removeComponentFromProject,
    shareProject,
    getSharedProject,
    getSharedProjectComponent
} from "../controllers/projectController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/shared/:shareId", getSharedProject);
router.get("/shared/:shareId/component/:componentId", getSharedProjectComponent);

router.post("/new-project", protect, newProject);
router.put("/update-project", protect, updateProject);
router.delete("/delete-project/:id", protect, deleteProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProject);
router.put("/add-component", protect, addComponentToProject);
router.put("/remove-component", protect, removeComponentFromProject);
router.post("/:id/share", protect, shareProject);

export default router;
