import React, { useState } from "react";
import { useReportStore } from "../../store/reportStore";
import { FileUpload } from "../../components/FileUpload";
import { Button } from "../../components/Button";

export const UploadCSV: React.FC = () => {
  const uploadCsv = useReportStore((s) => s.uploadCsv)
  const [file, setFile] = useState<File | null>(null);


  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) return

    await uploadCsv(file)
  }
  return (
    <form onSubmit={handleSubmit} className="upload-csv-form">
      <h2>Upload CSV</h2>
      <FileUpload onChange={(f) => setFile(f)} />
      <Button type="submit">Upload</Button>
    </form>
  );
};