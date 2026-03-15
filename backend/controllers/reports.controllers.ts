import { Request, Response } from "express";
import csv from "csv-parser";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import path from "path";
import {createAgentsReport, createAgentsReports, fetchReportById, fetchReports, fetchReportsByFilter}from "../services/reports.service.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

export async function createReport(req: Request, res: Response) {
  const { category, urgency, message } = req.body;
  
  if (!category || !urgency || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }
  console.log(req.user);

  let imagePath: string | undefined;

  if (req.files?.image) {

    const image = req.files?.image as UploadedFile;


    const uploadPath = `${Date.now()}_${image.name}`

;
    await image.mv(path.join(__dirname, "uploads", uploadPath));

    imagePath = uploadPath;

  }

  const report = await createAgentsReport(
    req.user!.id!,
    category,
    urgency,
    message,
    imagePath
  );

  res.status(201).json({ report });
}


export const uploadCsvReports = async (req: Request, res: Response) => {

  if (!req.files?.csv) {
    return res.status(400).json({ message: "CSV file required" });
  }

  const file = req.files?.csv as UploadedFile;


  const filePath = `uploads/${Date.now()}_${file.name}`;

  await file.mv(filePath);

  const reports: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {

      reports.push({
        userId: req.user!.id,
        category: row.category,
        urgency: row.urgency,
        message: row.message,
        sourceType: "csv"
      });

    })
    .on("end", async () => {

      await createAgentsReports(reports);

      res.json({
        inserted: reports.length
      });

    });

};

export async function getReports(req: Request, res: Response) {

  
  const reports = await fetchReports(
    req.user!.id!,
    req.user!.role,
    
  );

  res.json({ reports });
}

export async function getReportsByFilters(req: Request, res: Response) {

  const filter: any = {};

  if (req.query.category) filter.category = req.query.category;
  if (req.query.urgency) filter.urgency = req.query.urgency;
  if (req.query.agentCode) filter.agentCode = req.query.agentCode;
  
  const reports = await fetchReportsByFilter(
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