export default function KPIBox({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #334155",
        borderRadius: "12px",
        padding: "20px",
        background: "#0f172a",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h4
        style={{
          margin: 0,
          fontSize: "18px",
          color: "#cbd5e1",
        }}
      >
        {title}
      </h4>

      <p
        style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: "bold",
          color: "#f8fafc",
        }}
      >
        {value}
      </p>
    </div>
  );
}
