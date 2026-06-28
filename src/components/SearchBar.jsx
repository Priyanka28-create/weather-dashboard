function SearchBar({
  city,
  setCity,
  getWeather,
  getCurrentLocationWeather,
}) {
  return (
    <>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeather();
            }
          }}
        />

        <button onClick={getWeather}>
          🔍 Search
        </button>
      </div>

      <button
        className="location-btn"
        onClick={getCurrentLocationWeather}
      >
        📍 Use My Location
      </button>
    </>
  );
}

export default SearchBar;