import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function WeatherAnalytics({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  const chartData = forecast.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "numeric",
    }),
    temp: Math.round(item.main.temp),
    humidity: item.main.humidity,
    wind: item.wind.speed,
  }));

  return (
    <div className="analytics-container">
      <h2>📊 Weather Analytics</h2>

      <div className="charts-grid">

        <div className="chart-card">
          <h3>🌡 Temperature</h3>

          <ResponsiveContainer width="100%" height={250}>
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

        <div className="chart-card">
          <h3>💧 Humidity</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="humidity" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>💨 Wind Speed</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="wind"
                stroke="#f97316"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default WeatherAnalytics;