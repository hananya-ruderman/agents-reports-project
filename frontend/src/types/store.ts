import type {User, Report, ReportFilters, UserDTO, LoginRequest, CreateReportDTO} from './index'

export interface AuthStore {
    user: User |null;
    token: string | null;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    logout: () => void;
}

export interface ReportStore {
    reports: Report[];
    filters: ReportFilters;
    isLoading: boolean;
    fetchReports: () => Promise<void>;
    createReports: (data: CreateReportDTO)=> Promise<void>;
    uploadCsv: (file: File) => Promise<void>;
    setFilters: (filters: ReportFilters) => void

}

export interface UserStore {
    users : User[];
    isLoading: boolean;
    fetchUsres: ()=> Promise<void>;
    createUser: (user: UserDTO) => void
}