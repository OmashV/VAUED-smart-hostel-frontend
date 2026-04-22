import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function HighRiskRoomsChart({ data }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="room_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="riskScore" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}