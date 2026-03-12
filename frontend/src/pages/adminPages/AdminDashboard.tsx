import React from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router";

export const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-admin">
      <h2>Admin Dashboard</h2>
      <Button onClick={() => navigate("/users")}>Manage Users</Button>
      <Button onClick={() => navigate("/reports")}>View Reports</Button>
    </div>
  );
};