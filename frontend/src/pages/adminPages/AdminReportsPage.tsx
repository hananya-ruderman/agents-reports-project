import React, { useEffect, useState } from "react";
import { useReportStore } from "../../store/reportStore";
import { Table } from "../../components/Table";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const ReportsAdmin: React.FC = () => {
  const reports = useReportStore((s) => s.reports);
  const fetchReports = useReportStore((s) => s.fetchReports);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const handleFilter = async () => {
    await fetchReports(); 
  };

  return (
    <div>
      <h2>Reports Admin</h2>
      <div className="filters">
        <Input placeholder="Category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} />
        <Input placeholder="Urgency" value={filterUrgency} onChange={(e) => setFilterUrgency(e.target.value)} />
        <Button onClick={handleFilter}>Apply Filter</Button>
      </div>
      <Table data={reports} />
    </div>
  );
};