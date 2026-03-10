import express from "express";
import multer from "multer";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {createReport, getReport, getReports} from "../controllers/reports.controllers.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.route("/")
    .post(authenticateToken, upload.single("image"), createReport)
    .get(authenticateToken, getReports);

router.route("/:id")
    .get(authenticateToken, getReport)

export default router;