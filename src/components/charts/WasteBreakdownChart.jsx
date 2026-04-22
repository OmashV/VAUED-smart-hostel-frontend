import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#6366f1"];

export default function WasteBreakdownChart({ data }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="waste_risk_level"
            outerRadius={102}
            innerRadius={50}
            paddingAngle={3}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.waste_risk_level} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #d6e0ee",
              boxShadow: "0 10px 28px rgba(16, 33, 61, 0.1)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
