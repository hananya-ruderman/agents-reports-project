import { create } from "zustand"
import { reportsService } from "../services/reportService"
import type { ReportStore, ReportFilters, CreateReportDTO } from "../types/index"

export const useReportStore = create<ReportStore>((set, get) => ({
  reports: [],
  filters: {} as ReportFilters,
  isLoading: false,

  fetchReports: async () => {
    set({ isLoading: true })
    setTimeout(async ()=>{

      const reports = await reportsService.getReports() 
       set({ reports, isLoading: false })

    }, 3000)
  },

  fetchReportsWithFilter: async (filter) => {
    set({ isLoading: true })
    const reports = await reportsService.getFilteredReports(filter) 
    set({ reports, isLoading: false })
  },

  createReports: async (formData: CreateReportDTO) => {
    set({ isLoading: true })
    await reportsService.createReport(formData)
    await get().fetchReports() 
    set({ isLoading: false })
  },

  uploadCsv: async (file: File) => {
  set({ isLoading: true })

  try {
    await reportsService.uploadCsv(file)
  } finally {
    set({ isLoading: false })
  }},


  setFilters: (filters: ReportFilters) => set({ filters })
}))