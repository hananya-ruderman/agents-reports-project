import { Request, Response } from "express";
import {createAgentsReport, fetchReportById, fetchReports}from "../services/reports.service.js";

export async function createReport(req: Request, res: Response) {

  const { category, urgency, message } = req.body;

  if (!category || !urgency || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const imagePath = req.file?.path;

  const report = await createAgentsReport(
    req.user!.id!,
    category,
    urgency,
    message,
    imagePath
  );

  res.status(201).json({ report });
}

export async function getReports(req: Request, res: Response) {

  const filter: any = {};

  if (req.query.category) filter.category = req.query.category;
  if (req.query.urgency) filter.urgency = req.query.urgency;
  if (req.query.agentCode) filter.agentCode = req.query.agentCode;

  const reports = await fetchReports(
    req.user!.id!,
    req.user!.role,
    filter
  );

  res.json({ reports });
}

export async function getReport(req: Request, res: Response) {

  try {

    const report = await fetchReportById(req.user!.id!, req.user!.role, req.params!.id! as string
    );

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ report });

  } catch {

    return res.status(403).json({ error: "Forbidden" });

  }
}