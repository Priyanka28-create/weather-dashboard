function WeatherCard({ weather }) {
  if (!weather) return null;
  const now = Date.now() / 1000;
const sunrise = weather.sys.sunrise;
const sunset = weather.sys.sunset;

let sunPosition = 0;

if (now <= sunrise) {
  sunPosition = 0;
} else if (now >= sunset) {
  sunPosition = 100;
} else {
  sunPosition = ((now - sunrise) / (sunset - sunrise)) * 100;
}

  return (
    <div className="weather-card">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>

      <div
        className={`weather-animation ${weather.weather[0].main.toLowerCase()}`}
      >
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
        />
      </div>

      <div className="temp-card">
        <h1>{Math.round(weather.main.temp)}°C</h1>
        <p>{weather.weather[0].description}</p>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <h4>💧</h4>
          <p>{weather.main.humidity}%</p>
          <span>Humidity</span>
        </div>

        <div className="detail-card">
          <h4>💨</h4>
          <p>{weather.wind.speed} m/s</p>
          <span>Wind Speed</span>
        </div>

        <div className="detail-card">
          <h4>🌡️</h4>
          <p>{Math.round(weather.main.feels_like)}°C</p>
          <span>Feels Like</span>
        </div>

        <div className="detail-card">
          <h4>📊</h4>
          <p>{weather.main.pressure} hPa</p>
          <span>Pressure</span>
        </div>
      </div>

      {/* Sun Journey */}

      <div className="sun-card">
        <h2>🌅 Sun Journey</h2>

        <div className="sun-times">
          <div>
            <h4>Sunrise</h4>
            <p>
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="sun-progress">
            <div className="sun-line"></div>

           <div
  className="sun-icon"
  style={{ left: `${sunPosition}%` }}
>
  ☀️
</div>
          </div>

          <div>
            <h4>Sunset</h4>
            <p>
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Weather Highlights */}

      <div className="highlights-card">
        <h2>✨ Weather Highlights</h2>

        <div className="highlights-grid">
          <div className="highlight-item">
            <span>🌡 Max Temp</span>
            <h3>{Math.round(weather.main.temp_max)}°C</h3>
          </div>

          <div className="highlight-item">
            <span>❄ Min Temp</span>
            <h3>{Math.round(weather.main.temp_min)}°C</h3>
          </div>

          <div className="highlight-item">
            <span>👁 Visibility</span>
            <h3>{(weather.visibility / 1000).toFixed(1)} km</h3>
          </div>

          <div className="highlight-item">
            <span>☁ Clouds</span>
            <h3>{weather.clouds.all}%</h3>
          </div>

          <div className="highlight-item">
            <span>🌊 Sea Level</span>
            <h3>{weather.main.sea_level ?? "--"} hPa</h3>
          </div>

          <div className="highlight-item">
            <span>🧭 Ground Level</span>
            <h3>{weather.main.grnd_level ?? "--"} hPa</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;