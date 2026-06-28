import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function TemperatureChart({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  const chartData = forecast.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "numeric",
    }),
    temp: Math.round(item.main.temp),
  }));

  return (
    <div className="chart-container">
      <h2>📈 Temperature Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#4f7b52"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;