import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function FloorComparisonChart({ data }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="floor_no" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalEnergyUsage" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
