export default function FilterBar({ filters, filterOptions, onChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-field">
        <label htmlFor="floorFilter">Floor</label>
        <select
          id="floorFilter"
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
      </div>

      <div className="filter-field">
        <label htmlFor="timeBlockFilter">Time Block</label>
        <select
          id="timeBlockFilter"
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
      </div>

      <div className="filter-field">
        <label htmlFor="startDateFilter">Start Date</label>
        <input
          id="startDateFilter"
          type="date"
          value={filters.startDate || ""}
          onChange={(e) => onChange("startDate", e.target.value)}
        />
      </div>

      <div className="filter-field">
        <label htmlFor="endDateFilter">End Date</label>
        <input
          id="endDateFilter"
          type="date"
          value={filters.endDate || ""}
          onChange={(e) => onChange("endDate", e.target.value)}
        />
      </div>
    </div>
  );
}
