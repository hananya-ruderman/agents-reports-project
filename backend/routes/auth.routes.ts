import express from "express";
import { getMe, userLogin } from "../controllers/auth.controllers.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", userLogin);
router.get("/me",authenticateToken, getMe)

export default router;