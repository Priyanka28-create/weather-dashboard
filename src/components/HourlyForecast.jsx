import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
} from "react-icons/wi";

function HourlyForecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  const getWeatherIcon = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
        return <WiDaySunny className="weather-icon sunny" />;

      case "clouds":
        return <WiCloud className="weather-icon cloudy" />;

      case "rain":
      case "drizzle":
        return <WiRain className="weather-icon rainy" />;

      case "thunderstorm":
        return <WiThunderstorm className="weather-icon thunder" />;

      case "snow":
        return <WiSnow className="weather-icon snowy" />;

      default:
        return <WiCloud className="weather-icon cloudy" />;
    }
  };

  return (
    <div className="hourly-container" style={{ marginTop: "50px" }}>
      <h2>🕒 Hourly Forecast</h2>

      <div className="hourly-cards">
        {forecast.slice(0, 8).map((hour) => (
          <div key={hour.dt} className="hour-card">
            <p className="hour-time">
              {new Date(hour.dt * 1000).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>

            {getWeatherIcon(hour.weather[0].main)}

            <h3>{Math.round(hour.main.temp)}°C</h3>

            <span>{hour.weather[0].main}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;