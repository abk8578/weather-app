import L from "leaflet";
import { useEffect, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

// Fix default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Create custom red warning icon
const createWarningIcon = () => {
  return L.divIcon({
    className: "custom-warning-icon",
    html: `<div style="
      width: 40px;
      height: 40px;
      background: radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(220,38,38,1) 100%);
      border: 3px solid #dc2626;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(239,68,68,0.6);
      animation: pulse 2s infinite;
    ">
      <span style="font-size: 20px;">⚠️</span>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Zoom map to new position
function MapZoom({ position, zoom = 13 }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, zoom, { animate: true });
    }
  }, [position, zoom, map]);
  return null;
}

// Handle map click
function MapClickMarker({ setPosition, setClickedLocation }) {
  useMapEvents({
    click(e) {
      const coords = [e.latlng.lat, e.latlng.lng];
      setPosition(coords); // move marker
      setClickedLocation(coords); // store clicked location
    },
  });
  return null;
}

const MapView = ({ lat, lon, weather }) => {
  const [position, setPosition] = useState([31.4491, 76.7048]);
  const [clickedLocation, setClickedLocation] = useState([]);

  // Update position if lat/lon props change
  useEffect(() => {
    if (lat && lon) {
      setPosition([lat, lon]);
    }
  }, [lat, lon]);

  // Check for severe weather conditions
  const isSevereWeather = () => {
    if (!weather || !weather.today) return false;
    const weatherCode = weather.today.weatherCode;
    const desc = weather.today.desc?.toLowerCase() || "";

    // Check for severe weather codes
    const severeCodes = [63, 65, 80, 81, 82, 95, 96, 99]; // Heavy rain, thunderstorms
    if (severeCodes.includes(weatherCode)) return true;

    // Check description
    if (
      desc.includes("heavy rain") ||
      desc.includes("thunderstorm") ||
      desc.includes("violent") ||
      desc.includes("extreme")
    )
      return true;

    return false;
  };

  const hasSevereWeather = isSevereWeather();
  const warningIcon = createWarningIcon();

  console.log(clickedLocation, "clickedLocation");

  return (
    <>
      <div className="h-[520px] lg:h-[600px] xl:h-[700px] 2xl:h-[760px] w-full rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Red warning circle for severe weather */}
          {hasSevereWeather && (
            <Circle
              center={position}
              radius={5000}
              pathOptions={{
                color: "#dc2626",
                fillColor: "#ef4444",
                fillOpacity: 0.3,
                weight: 3,
              }}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-bold text-red-600 text-lg">
                    ⚠️ Severe Weather Alert
                  </p>
                  <p className="text-sm mt-1">{weather?.today.desc}</p>
                </div>
              </Popup>
            </Circle>
          )}

          {/* Warning marker for severe weather */}
          {hasSevereWeather && (
            <Marker position={position} icon={warningIcon}>
              <Popup>
                <div className="text-center">
                  <p className="font-bold text-red-600 text-lg mb-2">
                    ⚠️ Weather Warning
                  </p>
                  <p className="text-sm">
                    <strong>Condition:</strong> {weather?.today.desc}
                  </p>
                  <p className="text-sm">
                    <strong>Temperature:</strong> {weather?.today.temp}°C
                  </p>
                  <p className="text-sm">
                    <strong>Wind:</strong> {weather?.today.wind}
                  </p>
                  <p className="text-xs text-red-600 mt-2">
                    ⚠️ Stay safe and avoid outdoor activities
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Normal marker when no severe weather */}
          {!hasSevereWeather && (
            <Marker position={position}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">
                    {weather?.today.desc || "Current Location"}
                  </p>
                  <p className="text-sm">Latitude: {position[0].toFixed(4)}</p>
                  <p className="text-sm">Longitude: {position[1].toFixed(4)}</p>
                  {weather && (
                    <>
                      <p className="text-sm mt-1">
                        🌡️ Temp: {weather.today.temp}°C
                      </p>
                      <p className="text-sm">💨 Wind: {weather.today.wind}</p>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Clickable map */}
          <MapClickMarker
            setPosition={setPosition}
            setClickedLocation={setClickedLocation}
          />

          {/* Zoom on new position */}
          <MapZoom position={position} zoom={13} />
        </MapContainer>
      </div>

      {/* Show clicked location */}
      {clickedLocation && (
        <div className="mt-4 p-4 rounded-lg shadow bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold">Clicked Location</h2>
          <p>Latitude: {clickedLocation[0]}</p>
          <p>Longitude: {clickedLocation[1]}</p>
        </div>
      )}

      {/* Weather UI with severe weather warning */}
      {weather && (
        <div
          className={`mt-4 p-4 rounded-lg shadow ${
            hasSevereWeather
              ? "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/20 border-2 border-red-300 dark:border-red-500/50"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Current Weather</h2>
            {hasSevereWeather && (
              <span className="text-2xl animate-pulse">⚠️</span>
            )}
          </div>
          <p>🌡️ Temp: {weather.today.temp}°C</p>
          <p>💨 Wind: {weather.today.wind} km/h</p>
          {hasSevereWeather && (
            <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded border border-red-300 dark:border-red-500/50">
              <p className="text-sm font-bold text-red-600">
                ⚠️ Severe Weather Alert
              </p>
              <p className="text-xs text-red-700">{weather.today.desc}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MapView;
