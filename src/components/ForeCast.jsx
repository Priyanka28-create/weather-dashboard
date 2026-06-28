function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  // One forecast per day (around 12:00 PM)
  const dailyForecast = forecast.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="forecast-container">
      <h2>📅 5-Day Forecast</h2>

      <div className="forecast-cards">
        {dailyForecast.map((day) => (
          <div key={day.dt} className="forecast-card">
            <p>
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />

            <h3>{Math.round(day.main.temp)}°C</h3>

            <p>{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;