import { createReport, getAllReports, getReportById } from "../dataAccess/Reports.dal.js";
import { Report } from "../models/types.js";
import { ObjectId } from "mongodb";

export async function createAgentsReport(
  userId: string,
  category: string,
  urgency: string,
  message: string,
  imagePath?: string
) {

  const report: Omit<Report, "_id"> = {
    userId,
    category,
    urgency,
    message,
    imagePath,
    sourceType: "json",
    createdAt: new Date()
  };

  return createReport(report);
}

export async function fetchReports(userId: string, role: string, filter: any) {

  if (role === "Agent") {
    filter.userId = userId;
  }

  return getAllReports(filter);
}

export async function fetchReportById(userId: string, role: string, id: string) {

  const report = await getReportById(id);

  if (!report) return null;

  if (role === "Agent" && report.userId !== userId) {
    throw new Error("forbidden");
  }

  return report;
}