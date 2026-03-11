import React from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router";

export const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-admin">
      <h2>Admin Dashboard</h2>
      <Button onClick={() => navigate("/users-admin")}>Manage Users</Button>
      <Button onClick={() => navigate("/reports-admin")}>View Reports</Button>
    </div>
  );
};