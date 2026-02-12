import express from "express";
import { signup, login, logoutUser, checkAuth, getUsers, getUser, updateUser, deleteUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logoutUser);
router.get("/check", protect, checkAuth);

// Protected user routes
router.get("/users", protect, getUsers);
router.get("/users/:id", protect, getUser);
router.put("/users/:id", protect, updateUser);
router.delete("/users/:id", protect, deleteUser);

export default router;
