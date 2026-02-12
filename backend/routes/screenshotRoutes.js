import express from "express";
import {generateScreenshot} from "../controllers/screenshotController.js";

const router = express.Router();

router.post("/", generateScreenshot);

export default router;
