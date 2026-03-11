import React from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router";

export const DashboardAgent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-agent">
      <h2>Agent Dashboard</h2>
      <Button onClick={() => navigate("/report-new")}>New Report</Button>
      <Button onClick={() => navigate("/reports-my")}>My Reports</Button>
      <Button onClick={() => navigate("/upload-csv")}>Upload CSV</Button>
    </div>
  );
};