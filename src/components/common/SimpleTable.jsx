export default function SimpleTable({ columns, data }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ color: "#5f7394" }}>
                No data available for the selected filters.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
