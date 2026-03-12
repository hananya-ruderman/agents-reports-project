import React from "react";

interface FileUploadProps {
  onChange: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
  return (
    <input
      type="file"
      className="file-upload"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) onChange(e.target.files[0]);
      }}
    />
  );
};