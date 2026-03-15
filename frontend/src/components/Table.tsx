interface TableProps<T> {
  data: T[];
}

export const Table = <T extends Object>({ data }: TableProps<T>) => {
  if (data.length == 0) return <p>No data</p>;

  const columns = Object.keys(data[0]) as (keyof T)[];
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col)}>{String(col)}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row: any, i: any) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={String(col)}>
                {col === "imagePath" ? <img src={`http://localhost:5002/uploads/${row[col]}`} alt="image" /> : row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
