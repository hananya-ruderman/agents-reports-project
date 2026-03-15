import { createReport, getAllReports, getReportById, getReportsByFilter } from "../dataAccess/Reports.dal.js";
import { Report, NewReport } from "../models/types.js";

export async function createAgentsReport(
  userId: string,
  category: string,
  urgency: string,
  message: string,
  imagePath?: string
) {

  const report:NewReport = {
    userId,
    category,
    urgency,
    message,
    imagePath,
    sourceType: "form",
    createdAt: new Date()
  };

  return createReport(report);
}

export async function createAgentsReports(reports: Partial<NewReport>[]){
  const createdList = []
  for (const report of reports){
    const created = await createAgentsReport(
      report.userId!,
      report.category!,
      report.urgency!,
      report.message!,
      report.imagePath
    );
    createdList.push(created)
    
  }
  return createdList

}


export async function fetchReports(userId: string, role: string) {
  const filter: Partial<Report>= {}
  if (role === "Agent") {
    filter.userId = userId;
  }
  

  return getAllReports(filter);
}

export async function fetchReportsByFilter(userId: string, role: string, filter: any) {

  if (role === "Agent") {
    filter.userId = userId;
  }
  

  return getReportsByFilter(filter);
}

export async function fetchReportById(userId: string, role: string, id: string) {

  const report = await getReportById(id);

  if (!report) return null;

  if (role === "Agent" && report.userId !== userId) {
    throw new Error("forbidden");
  }

  return report;
}