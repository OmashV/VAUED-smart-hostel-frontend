export default function KPIBox({ title, value }) {
  const formattedValue =
    typeof value === "number" ? new Intl.NumberFormat().format(value) : value;

  return (
    <div className="kpi-card">
      <h4>{title}</h4>
      <p className="kpi-value">{formattedValue}</p>
      <span className="kpi-chip">Live Metric</span>
    </div>
  );
}
