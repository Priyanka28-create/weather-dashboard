import { useState, useEffect } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForeCast from "./components/ForeCast";
import HourlyForecast from "./components/HourlyForecast";
import AQICard from "./components/AQICard";
import Loader from "./components/Loader";
import ErrorCard from "./components/ErrorCard";
import WeatherMap from "./components/WeatherMap";
import TemperatureChart from "./components/TemperatureChart";
import WeatherAnalytics from "./components/WeatherAnalytics";
import SunProgress from "./components/SunProgress";

import {
  getCurrentWeather,
  getForecast,
  getAirQuality,
  getLocationWeather,
} from "./services/weatherAPI";

import {
  getWeatherBackground,
  formatDate,
  formatTime,
} from "./utils/weatherUtils";

function App() {
  const [city, setCity] = useState("");

  const [weather, setWeather] = useState(null);

  const [forecast, setForecast] = useState([]);

  const [airQuality, setAirQuality] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [recentCities, setRecentCities] = useState(() => {
    const saved = localStorage.getItem("recentCities");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

    const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");

      const current = await getCurrentWeather(city);

      if (current.cod !== 200) {
        setError("City not found");
        setWeather(null);
        return;
      }

      setWeather(current);

      const forecastData = await getForecast(city);

      setForecast(forecastData.list);

      const air = await getAirQuality(
        current.coord.lat,
        current.coord.lon
      );

      setAirQuality(air.list[0]);

      const updatedCities = [
        city,
        ...recentCities.filter(
          (item) => item.toLowerCase() !== city.toLowerCase()
        ),
      ].slice(0, 5);

      setRecentCities(updatedCities);

      localStorage.setItem(
        "recentCities",
        JSON.stringify(updatedCities)
      );
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        setLoading(true);
        setError("");

        const { latitude, longitude } = position.coords;

        const current = await getLocationWeather(latitude, longitude);

        setWeather(current);

        const forecastData = await getForecast(current.name);
        setForecast(forecastData.list);

        const air = await getAirQuality(latitude, longitude);
        setAirQuality(air.list[0]);
      } catch (err) {
        setError("Unable to fetch location weather");
      } finally {
        setLoading(false);
      }
    },
    () => {
  setLoading(false);
  setError("Location access denied");
}
  );
};

const searchCity = async (selectedCity) => {
  setCity(selectedCity);

  try {
    setLoading(true);
    setError("");

    const current = await getCurrentWeather(selectedCity);

    if (current.cod !== 200) {
      setError("City not found");
      return;
    }

    setWeather(current);

    const forecastData = await getForecast(selectedCity);
    setForecast(forecastData.list);

    const air = await getAirQuality(
      current.coord.lat,
      current.coord.lon
    );

    setAirQuality(air.list[0]);
  } catch (err) {
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className={`container ${getWeatherBackground(weather)} ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="background-animation">

  {weather?.weather[0].main === "Clouds" && (
    <>
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
    </>
  )}

  {weather?.weather[0].main === "Rain" && (
    <div className="rain-container">
      {Array.from({ length: 60 }).map((_, i) => (
        <span
          key={i}
          className="rain-drop"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></span>
      ))}
    </div>
  )}

  {weather?.weather[0].main === "Snow" && (
    <div className="snow-container">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  )}

  {weather?.weather[0].main === "Thunderstorm" && (
    <div className="lightning"></div>
  )}

</div>
      <h1>🌿 Weather Dashboard</h1>

      <p className="subtitle">
        Real-Time Weather Updates Anywhere
      </p>

      <div className="date-time">
        <p>{formatDate(currentTime)}</p>
        <h3>{formatTime(currentTime)}</h3>
      </div>

      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <SearchBar
        city={city}
        setCity={setCity}
        getWeather={fetchWeather}
        getCurrentLocationWeather={fetchCurrentLocation}
      />

      {recentCities.length > 0 && (
        <div className="recent-searches">
          <h3>Recent Searches</h3>

          <div className="recent-list">
            {recentCities.map((item) => (
              <button
                key={item}
                
               onClick={() => searchCity(item)} 
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <Loader loading={loading} />

<ErrorCard error={error} />

{weather && <WeatherCard weather={weather} />}

{weather && <WeatherMap weather={weather} />}

{weather && <SunProgress weather={weather} />}

{airQuality && <AQICard airQuality={airQuality} />}

{forecast.length > 0 && (
  <>
    <HourlyForecast forecast={forecast} />

    <WeatherAnalytics forecast={forecast} />

    <Forecast forecast={forecast} />
  </>
)}

</div>
);
}
export default App;

