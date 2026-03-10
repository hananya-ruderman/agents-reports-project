import express from "express";
import { createNewUser, listAllUsers } from "../controllers/admin.controllers.js";
import { authenticateToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express()

router.route("/users")
    .post(authenticateToken,requireAdmin, createNewUser)
    .get(authenticateToken, requireAdmin, listAllUsers)
    

export default router