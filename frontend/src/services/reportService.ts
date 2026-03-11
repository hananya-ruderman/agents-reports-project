import api from "../api/axios"
import type { Report, CreateReportDTO } from "../types/index"

export const reportsService = {

  async createReport(data: CreateReportDTO): Promise<Report> {
    const formData = new FormData()
    formData.append("category", data.category)
    formData.append("urgency", data.urgency)
    formData.append("message", data.message)
    if (data.image) formData.append("image", data.image)

    const res = await api.post("/reports", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    return res.data.report
  },



  async uploadCsv(file: File) {
    const formData = new FormData()
    formData.append("csv", file)

    const res = await api.post("/reports/upload-csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    return res.data
  },



  async getReports(): Promise<Report[]> {
    const res = await api.get("/reports")
    return res.data.reports
  },

  async getReportById(id: string): Promise<Report> {
    const res = await api.get(`/reports/${id}`)
    return res.data.report
  }
}