import React from "react";

interface TableProps {
  data: Record<string, any>[];
}

export const Table: React.FC<TableProps> = ({ data }) => {
  if (!data.length) return <p>No data</p>;

  const columns = Object.keys(data[0]);

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col}>{String(row[col])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};