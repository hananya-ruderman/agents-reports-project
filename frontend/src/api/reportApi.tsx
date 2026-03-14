import api from "./axios"
import type { Report } from "../types/index"


export const fetchReportsApi = async (): Promise<Report[]> => {
  const { data } = await api.get("/reports")
  return data.reports
}

export const fetchReportsByFilterApi = async (): Promise<Report[]> => {
  const { data } = await api.get("/reports/filterReports")
  return data.reports
}

export const fetchReportByIdApi = async (id: string): Promise<Report> => {
  const { data } = await api.get(`/reports/${id}`)
  return data.report
}

export const createReportApi = async (formData: FormData): Promise<Report> => {
  const { data } = await api.post("/reports", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return data.report
}