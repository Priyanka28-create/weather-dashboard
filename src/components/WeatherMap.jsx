import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function WeatherMap({ weather }) {
  if (!weather) return null;

  const position = [
    weather.coord.lat,
    weather.coord.lon,
  ];

  return (
    <div className="map-card">
      <h2>🗺 Weather Map</h2>

      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={false}
        style={{
          height: "350px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <strong>{weather.name}</strong>
            <br />
            🌡 {Math.round(weather.main.temp)}°C
            <br />
            ☁ {weather.weather[0].description}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default WeatherMap;