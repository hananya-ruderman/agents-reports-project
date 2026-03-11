import React, { useEffect } from "react";
import { useReportStore } from "../../store/reportStore";
import { Table } from "../../components/Table";

export const ReportsMy: React.FC = () => {
  const reports = useReportStore((s) => s.reports);
  const fetchReports = useReportStore((s) => s.fetchReports);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return <Table data={reports} />;
};