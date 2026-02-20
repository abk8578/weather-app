import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { decodeWeather } from "../../utils/weatherCodes";
import AboutPage from "../aboutUs/aboutUs";
import Hero from "../hero/hero";
import Highlights from "../Highlights/Highlights";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import MapCard from "../MapCard/MapCard";
import Footer from "../shared/footer";
import Header from "../shared/header";
import Tabs from "../Tabs/Tabs";
import TodayWeather from "../TodayWeather/TodayWeather";
import WeatherAlerts from "../WeatherAlerts/WeatherAlerts";
import WeeklyForecast from "../WeeklyForecast/WeeklyForecast";

export default function WeatherApp() {
  const [activeTab, setActiveTab] = useState("today");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState({
    lat: 28.6139,
    lon: 77.209,
    name: "New Delhi",
    region: "Delhi, India",
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const searchRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Close city suggestions on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setCities([]);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Fetch weather
  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const res = await fetch(url).then((r) => r.json());

      const hourlyByDate = {};
      res.hourly.time.forEach((t, i) => {
        const d = new Date(t);
        const dateKey = d.toISOString().slice(0, 10);
        if (!hourlyByDate[dateKey]) hourlyByDate[dateKey] = [];
        hourlyByDate[dateKey].push({
          time: d.toLocaleTimeString([], { hour: "numeric" }),
          temp: Math.round(res.hourly.temperature_2m[i]),
          icon: decodeWeather(res.hourly.weather_code[i]).icon,
          cond: decodeWeather(res.hourly.weather_code[i]).desc,
          weatherCode: res.hourly.weather_code[i],
        });
      });

      const formatted = {
        today: {
          temp: Math.round(res.current.temperature_2m),
          desc: decodeWeather(res.current.weather_code).desc,
          humidity: `${res.current.relative_humidity_2m}%`,
          wind: `${res.current.wind_speed_10m} km/h`,
          pressure: `${res.current.surface_pressure} hPa`,
          high: Math.round(res.daily.temperature_2m_max[0]),
          low: Math.round(res.daily.temperature_2m_min[0]),
          icon: decodeWeather(res.current.weather_code).icon,
          weatherCode: res.current.weather_code,
        },
        hourly: res.hourly.time.slice(0, 12).map((t, i) => ({
          time: new Date(t).toLocaleTimeString([], { hour: "numeric" }),
          temp: Math.round(res.hourly.temperature_2m[i]),
          icon: decodeWeather(res.hourly.weather_code[i]).icon,
          cond: decodeWeather(res.hourly.weather_code[i]).desc,
          weatherCode: res.hourly.weather_code[i],
        })),
        weekly: res.daily.time.map((d, i) => ({
          day: new Date(d).toLocaleDateString("en-US", { weekday: "short" }),
          date: d,
          temp: Math.round(res.daily.temperature_2m_max[i]),
          icon: decodeWeather(res.daily.weather_code[i]).icon,
          cond: decodeWeather(res.daily.weather_code[i]).desc,
          weatherCode: res.daily.weather_code[i],
        })),
        hourlyByDate,
      };

      setWeather(formatted);
      // Alerts logic here (can move to separate helper later)
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchCities = async (val) => {
    if (val.length < 2) return setCities([]);
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${val}&count=5&format=json`,
    ).then((r) => r.json());
    setCities(res.results || []);
  };

  useEffect(() => {
    fetchWeather(location.lat, location.lon);
  }, [location]);

  const getBackgroundImage = () => {
    if (!weather || !weather.today) {
      return "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1600&auto=format&fit=crop&q=60";
    }
    const code = weather.today.weatherCode;
    const clearCodes = [0, 1];
    const partlyCodes = [2];
    const overcastCodes = [3];
    const fogCodes = [45, 48];
    const drizzleCodes = [51, 53, 55];
    const rainCodes = [61, 63, 65, 80, 81, 82];
    const snowCodes = [71, 73, 75, 77, 85, 86];
    const thunderCodes = [95, 96, 99];
    if (clearCodes.includes(code))
      return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop&q=60";
    if (partlyCodes.includes(code))
      return "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1600&auto=format&fit=crop&q=60";
    if (overcastCodes.includes(code))
      return "https://images.unsplash.com/photo-1434700455326-30539faeb29f?w=1600&auto=format&fit=crop&q=60";
    if (fogCodes.includes(code))
      return "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop&q=60";
    if (drizzleCodes.includes(code))
      return "https://images.unsplash.com/photo-1497340525489-4413f06f3b48?w=1600&auto=format&fit=crop&q=60";
    if (rainCodes.includes(code))
      return "https://images.unsplash.com/photo-1444722842197-4dc285d06dd6?w=1600&auto=format&fit=crop&q=60";
    if (snowCodes.includes(code))
      return "https://images.unsplash.com/photo-1445793653867-8d94289c56b7?w=1600&auto=format&fit=crop&q=60";
    if (thunderCodes.includes(code))
      return "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?w=1600&auto=format&fit=crop&q=60";
    return "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1600&auto=format&fit=crop&q=60";
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-bold text-blue-600 text-xl">Loading SkyCast...</p>
          <p className="text-slate-500 mt-2">Fetching weather data</p>
        </div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 flex flex-col">
      {/* Header */}
      <Header
        alerts={alerts}
        search={search}
        setSearch={setSearch}
        cities={cities}
        setLocation={setLocation}
        fetchWeather={fetchWeather}
        fetchCities={fetchCities}
        setCities={setCities}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Hero Section */}
      <Hero
        location={location}
        weather={weather}
        currentTime={currentTime}
        getBackgroundImage={getBackgroundImage}
      />

      {/* Weather Alerts */}
      <WeatherAlerts alerts={alerts} dismissAlert={(id) => {}} />

      {/* Main Content */}
      <main className="w-full flex-1">
        <div className="max-w-8xl mx-auto px-6 lg:px-10 xl:px-12 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
            {/* Main Weather Content */}
            <div
              className={`space-y-8 ${
                activeTab === "today"
                  ? "lg:col-span-8 lg:mx-auto"
                  : "lg:col-span-12"
              }`}
            >
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === "today" && (
                <>
                  <TodayWeather
                    weather={weather}
                    location={location}
                    getBackgroundImage={getBackgroundImage}
                  />
                  <Highlights today={weather.today} />
                </>
              )}

              {activeTab === "hourly" && (
                <HourlyForecast hourly={weather.hourly} />
              )}

              {activeTab === "weekly" && (
                <WeeklyForecast
                  weekly={weather.weekly}
                  onDayClick={(item) => {
                    const hours = weather.hourlyByDate?.[item.date] || null;
                    setSelectedDay(item);
                    setSelectedHours(hours);
                  }}
                />
              )}

              {activeTab === "about" && <AboutPage />}
            </div>

            {/* Map Card (only for "today") */}
            {activeTab === "today" && (
              <div className="lg:col-span-4 w-full">
                <MapCard location={location} weather={weather} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      <AnimatePresence>
        {selectedHours && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedDay(null);
              setSelectedHours(null);
            }}
          >
            <motion.div
              className="max-w-6xl w-[95%] max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-2xl"
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                    {selectedDay?.day} Hours
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedDay?.cond}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedDay?.date
                      ? new Date(selectedDay.date).toLocaleDateString()
                      : ""}
                  </p>
                </div>
                <button
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                  onClick={() => {
                    setSelectedDay(null);
                    setSelectedHours(null);
                  }}
                >
                  Close
                </button>
              </div>
              {Array.isArray(selectedHours) && selectedHours.length > 0 ? (
                <HourlyForecast hourly={selectedHours} />
              ) : (
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  No hourly data for this day.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
