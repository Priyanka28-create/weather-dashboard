export function getWeatherBackground(weather) {
  if (!weather) return "default-bg";

  const condition = weather.weather[0].main.toLowerCase();
  const icon = weather.weather[0].icon;

  // Night icon (01n, 02n...)
  if (icon.includes("n")) {
    return "night-bg";
  }

  switch (condition) {
    case "clear":
      return "sunny-bg";

    case "clouds":
      return "cloudy-bg";

    case "rain":
    case "drizzle":
      return "rainy-bg";

    case "thunderstorm":
      return "storm-bg";

    case "snow":
      return "snow-bg";

    case "mist":
    case "fog":
    case "haze":
      return "mist-bg";

    default:
      return "default-bg";
  }
}
export function getAQIText(aqi) {
  switch (aqi) {
    case 1:
      return "Good 🟢";

    case 2:
      return "Fair 🟡";

    case 3:
      return "Moderate 🟠";

    case 4:
      return "Poor 🔴";

    case 5:
      return "Very Poor 🟣";

    default:
      return "Unknown";
  }
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString("en-IN");
}