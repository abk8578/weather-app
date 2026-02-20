// utils/weatherCodes.js
export const decodeWeather = (code) => {
  const map = {
    0: { desc: "Clear Sky", icon: "☀️" },
    1: { desc: "Mainly Clear", icon: "🌤️" },
    2: { desc: "Partly Cloudy", icon: "⛅" },
    3: { desc: "Overcast", icon: "☁️" },
    45: { desc: "Foggy", icon: "🌫️" },
    48: { desc: "Rime Fog", icon: "🌫️" },
    51: { desc: "Light Drizzle", icon: "🌦️" },
    53: { desc: "Moderate Drizzle", icon: "🌦️" },
    55: { desc: "Dense Drizzle", icon: "🌦️" },
    61: { desc: "Slight Rain", icon: "🌧️" },
    63: { desc: "Moderate Rain", icon: "🌧️", severe: true },
    65: { desc: "Heavy Rain", icon: "🌧️", severe: true },
    71: { desc: "Slight Snow", icon: "❄️" },
    73: { desc: "Moderate Snow", icon: "❄️" },
    75: { desc: "Heavy Snow", icon: "❄️", severe: true },
    77: { desc: "Snow Grains", icon: "❄️" },
    80: { desc: "Slight Rain Showers", icon: "🌦️" },
    81: { desc: "Moderate Rain Showers", icon: "🌦️", severe: true },
    82: { desc: "Violent Rain Showers", icon: "🌧️", severe: true },
    85: { desc: "Slight Snow Showers", icon: "🌨️" },
    86: { desc: "Heavy Snow Showers", icon: "🌨️", severe: true },
    95: { desc: "Thunderstorm", icon: "⛈️", severe: true },
    96: { desc: "Thunderstorm with Hail", icon: "⛈️", severe: true },
    99: { desc: "Violent Thunderstorm", icon: "⛈️", severe: true },
  };
  return map[code] || { desc: "Cloudy", icon: "☁️" };
};
