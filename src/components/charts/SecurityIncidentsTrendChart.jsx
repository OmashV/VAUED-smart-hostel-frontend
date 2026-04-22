import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function SecurityIncidentsTrendChart({ data }) {
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(),
  }));

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="securityIncidents" strokeWidth={2} />
          <Line type="monotone" dataKey="criticalAlerts" strokeWidth={2} />
          <Line type="monotone" dataKey="warningAlerts" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}