import React, { useState } from "react";
import { useReportStore } from "../../store/reportStore";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FileUpload } from "../../components/FileUpload";
import type { Category, Urgency,  } from "../../types";

export const ReportNew: React.FC = () => {
  const createReports = useReportStore((s) => s.createReports);

  const [category, setCategory] = useState<Category>("intelligence");
  const [urgency, setUrgency] = useState<Urgency>("low");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | undefined>();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createReports({
      category,
      urgency,
      message,
      image
    });
  };

  return (
    <form onSubmit={handleSubmit} className="report-form">
      <h2>New Report</h2>

      <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
        <option value="intelligence">Intelligence</option>
        <option value="logistics">Logistics</option>
        <option value="alert">Alert</option>
      </select>

      <select value={urgency} onChange={(e) => setUrgency(e.target.value as Urgency)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <Input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <FileUpload onChange={(file) => setImage(file)} />

      <Button type="submit">Submit Report</Button>
    </form>
  );
};