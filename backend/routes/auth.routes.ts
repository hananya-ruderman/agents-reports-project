import express from "express";
import { userLogin } from "../controllers/auth.controllers.js";

const router = express.Router()

router.route("/login")
    .post(userLogin)

export default router