import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import componentRoutes from "./routes/componentRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import screenshotRoutes from "./routes/screenshotRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/components", componentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/screenshot", screenshotRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));