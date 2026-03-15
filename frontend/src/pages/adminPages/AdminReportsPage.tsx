import React, { useEffect, useState } from "react";
import { useReportStore } from "../../store/reportStore";
import { Table } from "../../components/Table";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Category, Urgency } from "../../types";
import { Loader } from "../../components/loader";

export const ReportsAdmin: React.FC = () => {
  const reports = useReportStore((s) => s.reports);
  const isLoading = useReportStore((s)=> s.isLoading)
  const fetchReports = useReportStore((s) => s.fetchReports);
  const fetchReportsFilter = useReportStore((s) => s.fetchReportsWithFilter);
  const [filterCategory, setFilterCategory] = useState<Category>();
  const [filterUrgency, setFilterUrgency] = useState<Urgency>();

  useEffect(() => {
    fetchReports();
  }, []);

  const handleFilter = async () => {
    await fetchReportsFilter({category: filterCategory, urgency: filterUrgency}); 
  };

  if (isLoading){
    return <Loader/>
  }

  return (
    <div>
      <h2>Reports Admin</h2>
      <div className="filters">
        <Input placeholder="Category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value as Category)} />
        <Input placeholder="Urgency" value={filterUrgency} onChange={(e) => setFilterUrgency(e.target.value as Urgency)} />
        <Button onClick={handleFilter}>Apply Filter</Button>
      </div>
      <Table data={reports} />
    </div>
  );
};