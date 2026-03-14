import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {createReport, getReport, getReports, getReportsByFilters, uploadCsvReports} from "../controllers/reports.controllers.js";

const router = express.Router();



router.route("/")
    .post(authenticateToken, createReport)
    .get(authenticateToken, getReports);

router.route("/filterReports")
    .get(authenticateToken, getReportsByFilters)

router.route("/csv")
    .post(authenticateToken, uploadCsvReports);

router.route("/:id")
    .get(authenticateToken, getReport)

export default router;