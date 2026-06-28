function SunProgress({ weather }) {
  if (!weather) return null;

  const sunrise = weather.sys.sunrise * 1000;
  const sunset = weather.sys.sunset * 1000;
  const now = Date.now();

  let progress = ((now - sunrise) / (sunset - sunrise)) * 100;

  if (progress < 0) progress = 0;
  if (progress > 100) progress = 100;

  return (
    <div className="sun-progress-card">
      <h2>🌅 Sun Progress</h2>

      <div className="sun-times">
        <span>
          🌅{" "}
          {new Date(sunrise).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>

        <span>
          🌇{" "}
          {new Date(sunset).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p>{Math.round(progress)}% of daylight completed</p>
    </div>
  );
}

export default SunProgress;