function AQICard({ airQuality }) {
  if (!airQuality) return null;

  const aqi = airQuality.main.aqi;

  const status = [
    "Good",
    "Fair",
    "Moderate",
    "Poor",
    "Very Poor",
  ];

  return (
    <div className="aqi-card">
      <h2>🌿 Air Quality Index</h2>

      <h1>{aqi}</h1>

      <h3>{status[aqi - 1]}</h3>

      <div className="aqi-bar">
        <div
          className="aqi-progress"
          style={{
            width: `${aqi * 20}%`,
          }}
        ></div>
      </div>

      <p className="aqi-note">
        {aqi === 1
          ? "Perfect for outdoor activities 🌿"
          : aqi === 2
          ? "Air quality is acceptable 🙂"
          : aqi === 3
          ? "Sensitive people should be careful 😷"
          : aqi === 4
          ? "Limit outdoor activities ⚠️"
          : "Stay indoors if possible 🚨"}
      </p>
    </div>
  );
}

export default AQICard;