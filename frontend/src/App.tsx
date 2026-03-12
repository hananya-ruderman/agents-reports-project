import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { useAuthStore } from "./store/authStore";
import {LoginPage} from "./pages/LoginPage";
import {DashboardAgent} from "./pages/agentPages/AgentDashboard";
import {DashboardAdmin} from "./pages/adminPages/AdminDashboard";
import {ReportNew} from "./pages/agentPages/NewReportPage";
import {UploadCSV} from "./pages/agentPages/CSVUploadPage";
import {ReportsMy} from "./pages/agentPages/MyReportPage";
import {UsersAdmin} from "./pages/adminPages/AdminUsersPage";
import {ReportsAdmin} from "./pages/adminPages/AdminReportsPage";

function App() {

  type Role = "Admin" | "Agent"
  
  const RequireAuth = ({roles}: { roles: Role[] }) => {
    const user  = useAuthStore(s => s.user);
    if (!user) return <Navigate to="/" replace />;
    if (!roles.includes(user.role)) return <Navigate to="/" replace />;
    return <Outlet/>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

         
        <Route element={<RequireAuth roles={["Agent", "Admin"]}/>}>
          <Route path="/agent" element={<DashboardAgent />} />
          <Route path="/report-new" element={<ReportNew />} />
          <Route path="/upload-csv" element={<UploadCSV />} />
          <Route path="/reports-my" element={<ReportsMy />} />
        </Route>

        
        <Route element={ <RequireAuth roles={["Admin"]}/>}>
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/users" element={<UsersAdmin />} />
          <Route path="/reports" element={<ReportsAdmin />} />
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;