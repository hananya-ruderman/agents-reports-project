export type Category = "intelligence" | "logistics" | "alert";

export type Urgency = "low" | "medium" | "high";

export type SourceType = "form" | "csv";

export interface Report {
    id: string;
    userId: string;
    category: Category;
    urgency: Urgency;
    message: string;
    imagePath?: string;
    sourceType: SourceType;
    createdAt: string;

}

export interface CreateReportDTO {
    category: Category;
    urgency: Urgency;
    message: string;
    image?: File;

}

export interface ReportFilters {
    category?: Category;
    urgency?: Urgency;
    agentCode?: string;

}

export interface ReportResponse {
    reports: Report[]
}