import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function AlertsOverviewChart({ data }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid stroke="#d7e3f4" strokeDasharray="4 4" />
          <XAxis dataKey="alert_priority" tick={{ fill: "#587093", fontSize: 12 }} />
          <YAxis tick={{ fill: "#587093", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #d6e0ee",
              boxShadow: "0 10px 28px rgba(16, 33, 61, 0.1)",
            }}
          />
          <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
