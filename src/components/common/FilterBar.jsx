export default function FilterBar({ filters, filterOptions, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        marginBottom: "20px",
      }}
    >
      <select
        value={filters.floor_no || ""}
        onChange={(e) => onChange("floor_no", e.target.value)}
      >
        <option value="">All Floors</option>
        {filterOptions.floors?.map((floor) => (
          <option key={floor} value={floor}>
            Floor {floor}
          </option>
        ))}
      </select>

      <select
        value={filters.time_block || ""}
        onChange={(e) => onChange("time_block", e.target.value)}
      >
        <option value="">All Time Blocks</option>
        {filterOptions.timeBlocks?.map((block) => (
          <option key={block} value={block}>
            {block}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={filters.startDate || ""}
        onChange={(e) => onChange("startDate", e.target.value)}
      />

      <input
        type="date"
        value={filters.endDate || ""}
        onChange={(e) => onChange("endDate", e.target.value)}
      />
    </div>
  );
}
