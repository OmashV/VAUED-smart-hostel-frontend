import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function EnergyTrendChart({ data }) {
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(),
  }));

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={formattedData}>
          <CartesianGrid stroke="#d7e3f4" strokeDasharray="4 4" />
          <XAxis dataKey="date" tick={{ fill: "#587093", fontSize: 12 }} />
          <YAxis tick={{ fill: "#587093", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #d6e0ee",
              boxShadow: "0 10px 28px rgba(16, 33, 61, 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="totalEnergyUsage"
            stroke="#1d5ed8"
            strokeWidth={3}
            dot={{ r: 3, fill: "#1d5ed8" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
