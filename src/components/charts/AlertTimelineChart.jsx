import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function AlertTimelineChart({ data }) {
  const grouped = data.reduce((acc, item) => {
    const key = item.time_block;
    if (!acc[key]) {
      acc[key] = { time_block: key, count: 0 };
    }
    acc[key].count += item.count;
    return acc;
  }, {});

  const ordered = ["Night", "Morning", "Afternoon", "Evening"]
    .map((block) => grouped[block])
    .filter(Boolean);

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={ordered}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time_block" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}